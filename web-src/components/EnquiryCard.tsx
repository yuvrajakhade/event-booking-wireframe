import React from "react";
import { RecordItem } from "../../src/types";
import {
  CalendarDays,
  Clock3,
  Phone,
  MapPin,
  Bookmark,
  Users,
  Plus,
} from "lucide-react";

type EnquiryCardProps = {
  enquiry: RecordItem;
  isConvertDisabled?: boolean;
  onConvert?: () => void;
};

export function EnquiryCard({
  enquiry,
  isConvertDisabled = false,
  onConvert,
}: EnquiryCardProps) {
  return (
    <article className="card enquiry-card">
      <div className="event-top">
        <div className="tile-icon">
          <CalendarDays size={14} />
        </div>
        <div className="event-head-copy">
          <h3>{enquiry.customerName ?? enquiry.name}</h3>
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
        <p>
          <MapPin size={16} />
          {enquiry.venue}
        </p>
        <p>
          <Bookmark size={16} />
          {enquiry.title}
        </p>
        <p>
          <Users size={16} />
          {enquiry.rooms.length} rooms
        </p>
      </div>

      <div className="event-actions">
        <button
          type="button"
          className="btn-icon btn-assign"
          aria-label="Convert enquiry"
          aria-disabled={isConvertDisabled}
          disabled={isConvertDisabled}
          title={
            isConvertDisabled
              ? "This enquiry date is already booked"
              : "Convert enquiry"
          }
          onClick={(e) => {
            e.stopPropagation();
            if (!isConvertDisabled) {
              onConvert?.();
            }
          }}
        >
          <Plus size={18} />
        </button>
      </div>
    </article>
  );
}
