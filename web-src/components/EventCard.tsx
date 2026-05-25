import React from "react";
import { RecordItem } from "../../src/types";
import {
  CalendarDays,
  Clock3,
  MapPin,
  Phone,
  Bookmark,
  Users,
  SquarePen,
  LogIn,
  LogOut,
} from "lucide-react";

type EventCardProps = {
  event: RecordItem;
  mode?: "booked" | "completed";
  onEdit?: () => void;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
};

export function EventCard({
  event,
  mode = "booked",
  onEdit,
  onCheckIn,
  onCheckOut,
}: EventCardProps) {
  const isCompleted = mode === "completed";
  const displayDate = event.eventDate ?? "";

  return (
    <article className="card event-card">
      <div className="event-top">
        <div className="tile-icon">
          <CalendarDays size={14} />
        </div>
        <div className="event-head-copy">
          <h3>{event.customerName ?? event.name}</h3>
          <span className="date-pill">
            <Clock3 size={14} />
            {displayDate}
          </span>
        </div>
      </div>

      <div className="meta-list">
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
          <Bookmark size={16} />
          {event.title}
        </p>
        <p>
          <Users size={16} />
          {event.rooms.length} rooms
        </p>
      </div>

      {!isCompleted && (
        <div className="event-actions">
          <button
            type="button"
            className="btn-icon btn-edit"
            aria-label="Edit event"
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
          >
            <SquarePen size={18} />
          </button>
          <button
            type="button"
            className="btn-icon btn-assign"
            aria-label="Check in"
            onClick={(e) => {
              e.stopPropagation();
              onCheckIn?.();
            }}
          >
            <LogIn size={18} />
          </button>
          <button
            type="button"
            className="btn-icon btn-complete"
            aria-label="Check out"
            onClick={(e) => {
              e.stopPropagation();
              onCheckOut?.();
            }}
          >
            <LogOut size={18} />
          </button>
        </div>
      )}
    </article>
  );
}
