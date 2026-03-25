import React from "react";
import { RoomsDropdown } from "../components/RoomsDropdown";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { mockEnquiries, mockEvents } from "../../src/data/mock";
import { CalendarDays, Save, X } from "lucide-react";

export function EventFormScreen({ mode = "add" }: { mode?: "add" | "edit" }) {
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
  // New form state for all fields in the screenshot
  const [formData, setFormData] = React.useState({
    title: existingEvent?.title || "",
    customer: existingEvent?.customerName || "",
    phone: existingEvent?.phone || "",
    altPhone: existingEvent?.altPhone || "",
    eventType: existingEvent?.eventType || "",
    venue: existingEvent?.venue || "",
    rooms: existingEvent?.rooms || [],
    eventSource: existingEvent?.eventSource || "Enquiry",
    confirmed: existingEvent?.confirmed || false,
    startDate: existingEvent?.start?.slice(0, 10) || "",
    startTime: existingEvent?.start?.slice(11, 16) || "",
    endDate: existingEvent?.end?.slice(0, 10) || "",
    endTime: existingEvent?.end?.slice(11, 16) || "",
  });

  function updateField(field: string, value: any) {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: Save logic here
    alert("Event " + (mode === "edit" ? "updated" : "created") + "! (Demo)");
    navigate(-1);
  }

  return (
    <section className="event-form-section">
      <form className="event-form" onSubmit={handleSubmit} autoComplete="off">
        {/* Basic Information Section */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-icon" style={{ background: "#7266F0" }}>
              <svg width="24" height="24" fill="white">
                <rect width="24" height="24" rx="6" />
              </svg>
            </span>
            <span className="form-card-title">Basic Information</span>
          </div>
          <div className="form-group">
            <label>Title *</label>
            <input
              type="text"
              placeholder="Event title"
              value={formData.title}
              onChange={(e) => updateField("title", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Customer *</label>
            <input
              type="text"
              placeholder="Customer name"
              value={formData.customer}
              onChange={(e) => updateField("customer", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="+91..."
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Alternative Number</label>
            <input
              type="tel"
              placeholder="+91..."
              value={formData.altPhone}
              onChange={(e) => updateField("altPhone", e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Event Type *</label>
            <select
              value={formData.eventType}
              onChange={(e) => updateField("eventType", e.target.value)}
              required
            >
              <option value="">Select event type...</option>
              <option value="Wedding">Wedding</option>
              <option value="Conference">Conference</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label>Venue *</label>
            <select
              value={formData.venue}
              onChange={(e) => updateField("venue", e.target.value)}
              required
            >
              <option value="">Select venue...</option>
              <option value="Hall A">Hall A</option>
              <option value="Lawn 1">Lawn 1</option>
              <option value="Convention Center B">Convention Center B</option>
              <option value="Banquet Hall">Banquet Hall</option>
              <option value="Open Ground">Open Ground</option>
            </select>
          </div>
          <div className="form-group">
            <RoomsDropdown
              selectedRooms={formData.rooms}
              onChange={(rooms) => updateField("rooms", rooms)}
            />
          </div>
          <div className="form-group row-between">
            <label style={{ flex: 1 }}>Event Source *</label>
            <div className="event-source-toggle">
              <button
                type="button"
                className={formData.eventSource === "Enquiry" ? "active" : ""}
                onClick={() => updateField("eventSource", "Enquiry")}
              >
                Enquiry
              </button>
              <button
                type="button"
                className={formData.eventSource === "Booking" ? "active" : ""}
                onClick={() => updateField("eventSource", "Booking")}
              >
                Booking
              </button>
            </div>
          </div>
        </div>

        {/* Event Schedule Section */}
        <div className="form-card">
          <div className="form-card-header">
            <span className="form-card-icon" style={{ background: "#1CC8C8" }}>
              <CalendarDays size={24} color="#fff" />
            </span>
            <span className="form-card-title">Event Schedule</span>
          </div>
          <div className="form-group">
            <label>Start Date (YYYY-MM-DD)</label>
            <input
              type="date"
              value={formData.startDate}
              onChange={(e) => updateField("startDate", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Start Time (HH:MM)</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) => updateField("startTime", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Date (YYYY-MM-DD)</label>
            <input
              type="date"
              value={formData.endDate}
              onChange={(e) => updateField("endDate", e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>End Time (HH:MM)</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) => updateField("endTime", e.target.value)}
              required
            />
          </div>
        </div>

        <div className="event-form-actions">
          <button
            type="button"
            className="btn-cancel"
            onClick={() => navigate(-1)}
          >
            <X size={16} /> Cancel
          </button>
          <button type="submit" className="btn-create">
            <Save size={16} /> {mode === "edit" ? "Update" : "Create"}
          </button>
        </div>
      </form>
    </section>
  );
}
