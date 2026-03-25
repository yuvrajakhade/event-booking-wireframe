import React from "react";
import { Event } from "../../src/types";
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
  Eye,
} from "lucide-react";

type EventCardProps = {
  event: Event;
  onPress?: () => void;
  mode?: "booked" | "completed";
  onEdit?: () => void;
  onCheckIn?: () => void;
  onCheckOut?: () => void;
  onView?: () => void;
};

export function EventCard({
  event,
  onPress,
  mode = "booked",
  onEdit,
  onCheckIn,
  onCheckOut,
  onView,
}: EventCardProps) {
  const formatDate = (input: string) => {
    return new Date(input).toISOString().slice(0, 10);
  };

  const isCompleted = mode === "completed";

  return (
    <article className="card event-card interactive-card" onClick={onPress}>
      <div className="event-top">
        <div className="tile-icon">
          <CalendarDays size={14} />
        </div>
        <div className="event-head-copy">
          <h3>{event.customerName}</h3>
          <span className="date-pill">
            <Clock3 size={14} />
            {formatDate(event.start)}
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

      <div className="event-actions">
        {isCompleted ? (
          <button
            type="button"
            className="btn-icon btn-add"
            aria-label="View details"
            onClick={(e) => {
              e.stopPropagation();
              onView?.();
            }}
          >
            <Eye size={18} />
          </button>
        ) : (
          <>
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
          </>
        )}
      </div>
    </article>
  );
}
