import React from "react";
import { mockEnquiries } from "../../src/data/mock";
import { EnquiryCard, DateRangeFilter } from "../components";
import { CalendarDays, Search, SlidersHorizontal, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EnquiryListScreen() {
  const navigate = useNavigate();
  const activeCount = mockEnquiries.filter(
    (item) => item.status !== "Closed",
  ).length;
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);

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
        <DateRangeFilter
          onFilter={(from, to) => {
            setFromDate(from);
            setToDate(to);
          }}
        />
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
