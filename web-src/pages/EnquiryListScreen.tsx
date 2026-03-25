import React from "react";
import { mockEnquiries } from "../../src/data/mock";
import { EnquiryCard } from "../components/EnquiryCard";
import { CalendarDays, Search, SlidersHorizontal, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EnquiryListScreen() {
  const navigate = useNavigate();
  const activeCount = mockEnquiries.filter(
    (item) => item.status !== "Closed",
  ).length;
  const [fromDate] = React.useState("2026-03-01");
  const [toDate] = React.useState("2026-03-31");

  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Enquiries</h1>
          <span className="hero-header-chip">
            <Users size={12} />
            {activeCount} Active
          </span>
        </span>
      </header>

      <div className="date-filter-card compact-date-filter">
        <div className="date-filter-header">Date Range</div>
        <div className="date-filter-fields compact-date-fields">
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
            style={{ minWidth: 44, minHeight: 44, marginLeft: 8 }}
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      <div className="search-row card">
        <Search size={20} />
        <span>Search name/phone</span>
      </div>

      {mockEnquiries.length === 0 ? (
        <div className="card empty-state">No enquiries found.</div>
      ) : (
        mockEnquiries.map((enquiry) => (
          <EnquiryCard
            key={enquiry.id}
            enquiry={enquiry}
            onView={() => navigate("/events/evt_1")}
            onConvert={() => navigate(`/events/new?enquiryId=${enquiry.id}`)}
          />
        ))
      )}
    </section>
  );
}
