import React from "react";
import { Enquiry } from "../../src/types";
import {
  CalendarDays,
  Clock3,
  Phone,
  MapPin,
  Bookmark,
  Eye,
  Plus,
  Users,
} from "lucide-react";

type EnquiryCardProps = {
  enquiry: Enquiry;
  onPress?: () => void;
  onView?: () => void;
  onConvert?: () => void;
};

export function EnquiryCard({
  enquiry,
  onPress,
  onView,
  onConvert,
}: EnquiryCardProps) {
  return (
    <article className="card enquiry-card interactive-card" onClick={onPress}>
      <div className="event-top">
        <div className="tile-icon">
          <CalendarDays size={14} />
        </div>
        <div className="event-head-copy">
          <h3>{enquiry.name}</h3>
          <span className="date-pill">
            <Clock3 size={14} />
            {enquiry.eventDate}
          </span>
        </div>
      </div>

      <div className="meta-list">
        {enquiry.phone && (
          <p>
            <Phone size={16} />
            {enquiry.phone}
          </p>
        )}
        {enquiry.source && (
          <p>
            <MapPin size={16} />
            {enquiry.source}
          </p>
        )}
        {typeof enquiry.guests === "number" && (
          <p>
            <Users size={16} />
            {enquiry.guests} guests
          </p>
        )}
        <p>
          <Bookmark size={16} />
          Enquiry
        </p>
      </div>

      <div className="event-actions">
        <button
          type="button"
          className="btn-icon btn-add"
          aria-label="View enquiry"
          onClick={(e) => {
            e.stopPropagation();
            onView?.();
          }}
        >
          <Eye size={18} />
        </button>
        <button
          type="button"
          className="btn-icon btn-assign"
          aria-label="Convert enquiry"
          onClick={(e) => {
            e.stopPropagation();
            onConvert?.();
          }}
        >
          <Plus size={18} />
        </button>
      </div>

      <div className="enquiry-badge">
        <span
          className={`badge badge-${enquiry.status.toLowerCase().replace(/\s+/g, "-")}`}
        >
          {enquiry.status}
        </span>
      </div>
    </article>
  );
}
