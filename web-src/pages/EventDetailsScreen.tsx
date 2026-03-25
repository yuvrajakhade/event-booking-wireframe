import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../../src/data/mock";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Users,
  ArrowLeft,
  Pencil,
} from "lucide-react";

export function EventDetailsScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <section className="stack">
        <div className="card empty-state">Event not found.</div>
      </section>
    );
  }

  const missingItems = event.inventory
    .map((item) => ({
      ...item,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter((item) => item.missing > 0);

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <button
            type="button"
            className="icon-btn-ghost"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="hero-header-small">Event Details</h1>
          <span className="hero-header-chip">
            {missingItems.length} Missing
          </span>
        </span>
        <button
          type="button"
          className="btn-icon btn-edit detail-edit-btn"
          onClick={() => navigate(`/events/${event.id}/edit`)}
        >
          <Pencil size={16} />
        </button>
      </header>

      <article className="card detail-info-card">
        <p>
          <Users size={16} />
          {event.customerName}
        </p>
        {event.phone && (
          <p>
            <Phone size={16} />
            {event.phone}
          </p>
        )}
        <p>
          <MapPin size={16} />
          {event.venue}
        </p>
        <p>
          <CalendarDays size={16} />
          {event.start.slice(0, 10)} to {event.end.slice(0, 10)}
        </p>
        <p>
          <Clock3 size={16} />
          Status: {event.status}
        </p>
      </article>

      <article className="card">
        <h3>Rooms ({event.rooms.length})</h3>
        <div className="chip-list">
          {event.rooms.map((room) => (
            <span key={room} className="chip-item">
              {room}
            </span>
          ))}
        </div>
      </article>

      <article className="card">
        <h3>Inventory Summary</h3>
        {missingItems.length === 0 ? (
          <p className="subtitle">All inventory returned.</p>
        ) : (
          <div className="stack stack-tight">
            {missingItems.map((item) => (
              <div className="inventory-line" key={item.id}>
                <span>{item.name}</span>
                <strong>
                  Missing: {item.missing} {item.unit}
                </strong>
              </div>
            ))}
          </div>
        )}
      </article>
    </section>
  );
}
