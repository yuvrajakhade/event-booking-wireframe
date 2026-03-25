import React from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { mockEnquiries, mockEvents } from "../../src/data/mock";
import { CalendarDays, Save, X } from "lucide-react";

type EventFormScreenProps = {
  mode: "add" | "edit";
};

export function EventFormScreen({ mode }: EventFormScreenProps) {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [searchParams] = useSearchParams();
  const enquiryId = searchParams.get("enquiryId");

  const existingEvent =
    mode === "edit"
      ? mockEvents.find((event) => event.id === eventId)
      : undefined;
  const enquiry = enquiryId
    ? mockEnquiries.find((item) => item.id === enquiryId)
    : undefined;

  const [formData, setFormData] = React.useState({
    title: existingEvent?.title ?? "",
    customerName: existingEvent?.customerName ?? enquiry?.name ?? "",
    phone: existingEvent?.phone ?? enquiry?.phone ?? "",
    venue: existingEvent?.venue ?? "",
    startDate:
      existingEvent?.start.slice(0, 10) ?? enquiry?.eventDate ?? "2026-03-01",
    endDate: existingEvent?.end.slice(0, 10) ?? "2026-03-01",
    notes: "",
  });

  const heading = mode === "edit" ? "Edit Event" : "Add Event";

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    navigate("/events");
  };

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">{heading}</h1>
          <span className="hero-header-chip">
            {mode === "edit" ? "Edit" : "Add"}
          </span>
        </span>
      </header>

      <form className="card event-form-card" onSubmit={onSubmit}>
        <label>
          Event Title
          <input
            value={formData.title}
            onChange={(e) => updateField("title", e.target.value)}
            placeholder="Event title"
            required
          />
        </label>

        <label>
          Customer Name
          <input
            value={formData.customerName}
            onChange={(e) => updateField("customerName", e.target.value)}
            placeholder="Customer name"
            required
          />
        </label>

        <label>
          Phone Number
          <input
            value={formData.phone}
            onChange={(e) => updateField("phone", e.target.value)}
            placeholder="+91 98765 43210"
          />
        </label>

        <label>
          Venue
          <input
            value={formData.venue}
            onChange={(e) => updateField("venue", e.target.value)}
            placeholder="Hall A"
            required
          />
        </label>

        <div className="event-form-grid-2">
          <label>
            Start Date
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              required
            />
          </label>

          <label>
            End Date
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
              required
            />
          </label>
        </div>

        <label>
          Notes
          <textarea
            value={formData.notes}
            onChange={(e) => updateField("notes", e.target.value)}
            placeholder="Additional details"
            rows={3}
          />
        </label>

        <div className="event-form-actions">
          <button
            type="button"
            className="btn-outline"
            onClick={() => navigate(-1)}
          >
            <X size={16} />
            Cancel
          </button>
          <button type="submit" className="btn-solid">
            <Save size={16} />
            {mode === "edit" ? "Save Changes" : "Create Event"}
          </button>
        </div>
      </form>
    </section>
  );
}
