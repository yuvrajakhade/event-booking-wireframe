import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard, DateRangeFilter } from "../components";
import {
  CalendarDays,
  CheckCircle2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CompletedEventsScreen() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const completedEvents = mockEvents.filter((event) => {
    if (event.status !== "Completed") return false;
    const eventDate = new Date(event.start);
    if (fromDate && eventDate < fromDate) return false;
    if (toDate && eventDate > toDate) return false;
    return true;
  });

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Completed Events</h1>
          <span className="hero-header-chip chip-success">
            <CheckCircle2 size={12} />
            {completedEvents.length} Done
          </span>
        </span>
      </header>

      <div className="date-filter-card compact-date-filter">
        <DateRangeFilter
          onFilter={(from, to) => {
            setFromDate(from);
            setToDate(to);
          }}
        />
      </div>
      <div className="search-row card">
        <Search size={20} />
        <span>Search completed events...</span>
      </div>

      {completedEvents.length === 0 ? (
        <div className="card empty-state">No completed events yet.</div>
      ) : (
        completedEvents.map((event) => (
          <EventCard
            key={event.id}
            event={event}
            mode="completed"
            onPress={() => navigate(`/events/${event.id}`)}
            onView={() => navigate(`/events/${event.id}`)}
          />
        ))
      )}
    </section>
  );
}
