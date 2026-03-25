import React from "react";
import { mockEvents } from "../../src/data/mock";
import {
  AlertCircle,
  CalendarDays,
  IndianRupee,
  MinusCircle,
  Search,
  ChevronRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export function InventoryOverviewScreen() {
  const navigate = useNavigate();
  const allItems = mockEvents.flatMap((event) => event.inventory);
  const totalMissing = allItems.reduce(
    (sum, item) => sum + Math.max(0, item.issuedQty - item.returnedQty),
    0,
  );
  const totalPlanned = allItems.reduce((sum, item) => sum + item.plannedQty, 0);
  const recoveryRate =
    totalPlanned === 0
      ? 0
      : Math.round(((totalPlanned - totalMissing) / totalPlanned) * 100);

  const totalValue = allItems.reduce(
    (sum, item) => sum + item.plannedQty * (item.rate ?? 0),
    0,
  );

  const missingByEvent = mockEvents
    .map((event) => {
      const missing = event.inventory
        .map((item) => ({
          name: item.name,
          qty: Math.max(0, item.issuedQty - item.returnedQty),
          unit: item.unit,
        }))
        .filter((item) => item.qty > 0);

      const total = missing.reduce((sum, item) => sum + item.qty, 0);

      return {
        id: event.id,
        title: event.title,
        customer: event.customerName,
        venue: event.venue,
        date: event.start.slice(0, 10),
        total,
        firstMissing: missing[0],
      };
    })
    .filter((event) => event.total > 0);

  return (
    <section className="stack">
      <header className="card hero-card inventory-hero-header">
        <div className="inventory-overview-label">
          <h1 className="hero-header-small">Inventory Overview</h1>
          <span className="hero-header-chip">
            <AlertCircle size={12} />
            {totalMissing} Missing
          </span>
        </div>
        <div className="metric-grid">
          <article className="metric-card metric-danger">
            <AlertCircle size={20} />
            <strong>{totalMissing}</strong>
            <span>Missing Items</span>
          </article>
          <article className="metric-card metric-warning">
            <IndianRupee size={20} />
            <strong>{totalValue}</strong>
            <span>Total Value</span>
          </article>
        </div>
      </header>

      <div className="search-row card">
        <Search size={20} />
        <span>Search event/customer/venue</span>
      </div>

      <article className="card split-stats">
        <div>
          <AlertCircle size={20} />
          <strong>{totalMissing}</strong>
          <p>Total Missing Items</p>
        </div>
        <div>
          <CalendarDays size={20} />
          <strong>{missingByEvent.length}</strong>
          <p>Events</p>
        </div>
      </article>

      {missingByEvent.map((event) => (
        <article
          className="card missing-event-card interactive-card"
          key={event.id}
          onClick={() => navigate(`/inventory/missing/${event.id}`)}
        >
          <div className="missing-card-head">
            <div>
              <h3>{event.title}</h3>
              <p>
                {event.customer} • {event.venue}
              </p>
              <small>{event.date}</small>
            </div>
            <span className="count-pill">{event.total}</span>
          </div>
          {event.firstMissing && (
            <p className="missing-line">
              <MinusCircle size={15} />
              {event.firstMissing.name}: {event.firstMissing.qty}{" "}
              {event.firstMissing.unit}
            </p>
          )}
          <button
            type="button"
            className="inline-link-btn"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/inventory/missing/${event.id}`);
            }}
          >
            <ChevronRight size={16} />
            View Details
          </button>
        </article>
      ))}

      {/* Recovery Rate removed as per user request */}
    </section>
  );
}
