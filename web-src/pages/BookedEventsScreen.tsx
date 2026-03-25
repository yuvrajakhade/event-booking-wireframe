import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard, DateRangeFilter } from "../components";
import { CalendarDays, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BookedEventsScreen() {
  const navigate = useNavigate();

  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

  // Filter events by status and date range
  const filteredEvents = mockEvents.filter((event) => {
    if (event.status === "Completed") return false;
    const eventDate = new Date(event.start);
    if (fromDate && eventDate < fromDate) return false;
    if (toDate && eventDate > toDate) return false;
    return true;
  });

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Booked Events</h1>
          <span className="hero-header-chip">
            <CalendarDays size={12} />
            {filteredEvents.length} Events
          </span>
        </span>
      </header>

      <div className="date-filter-card compact-date-filter">
        <div className="date-filter-header">Date Range</div>
        <DateRangeFilter
          onFilter={(from, to) => {
            setFromDate(from);
            setToDate(to);
          }}
        />
      </div>

      <div className="search-row card">
        <Search size={28 - 8} />
        <span>Search event/customer/venue</span>
      </div>

      {filteredEvents.length === 0 ? (
        <div className="card empty-state">
          No active booked events right now.
        </div>
      ) : (
        filteredEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            onPress={() => navigate(`/events/${event.id}`)}
            onEdit={() => navigate(`/events/${event.id}/edit`)}
            onCheckIn={() => navigate(`/events/${event.id}/check-in`)}
            onCheckOut={() => navigate(`/events/${event.id}/check-out`)}
          />
        ))
      )}

      <button
        type="button"
        className="btn-icon btn-edit floating-add"
        aria-label="Add event"
        onClick={() => navigate("/events/new")}
      >
        <Plus size={26} />
      </button>
    </section>
  );
}
