import React from "react";
import { mockEvents } from "../../src/data/mock";
import { EventCard } from "../components/EventCard";
import {
  CalendarDays,
  CheckCircle2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CompletedEventsScreen() {
  const navigate = useNavigate();
  const completedEvents = mockEvents.filter(
    (event) => event.status === "Completed",
  );

  const [fromDate] = React.useState("YYYY-MM-DD");
  const [toDate] = React.useState("YYYY-MM-DD");

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

      <div className="search-row card">
        <Search size={20} />
        <span>Search completed events...</span>
      </div>

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
