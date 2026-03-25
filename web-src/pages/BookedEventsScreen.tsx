import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard } from "../components/EventCard";
import { CalendarDays, Plus, Search, SlidersHorizontal } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function BookedEventsScreen() {
  const navigate = useNavigate();
  const upcomingEvents = mockEvents.filter(
    (event) => event.status !== "Completed",
  );
  const [fromDate] = React.useState("2026-03-01");
  const [toDate] = React.useState("2026-03-31");

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Booked Events</h1>
          <span className="hero-header-chip">
            <CalendarDays size={12} />
            {upcomingEvents.length} Events
          </span>
        </span>
      </header>

      <div className="date-filter-card">
        <div className="date-filter-header">Date Range</div>
        <div className="date-filter-fields">
          <div className="date-field">
            <CalendarDays size={18} />
            <input value={fromDate} readOnly />
          </div>
          <span className="date-separator">to</span>
          <div className="date-field">
            <CalendarDays size={18} />
            <input value={toDate} readOnly />
          </div>
          <button
            type="button"
            className="btn-icon btn-edit filter-btn"
            aria-label="Filter"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="search-row card">
        <Search size={28 - 8} />
        <span>Search event/customer/venue</span>
      </div>

      {upcomingEvents.length === 0 ? (
        <div className="card empty-state">
          No active booked events right now.
        </div>
      ) : (
        upcomingEvents.map((event) => (
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
