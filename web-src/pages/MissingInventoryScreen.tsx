import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../../src/data/mock";
import { AlertCircle, ArrowLeft, Search } from "lucide-react";
import { DateRangeFilter } from "../components";

type MissingRow = {
  id: string;
  name: string;
  unit: string;
  issuedQty: number;
  returnedQty: number;
  missing: number;
};

type MissingInventoryLocationState = {
  missingRows?: MissingRow[];
};

export function MissingInventoryScreen() {
  const [fromDate, setFromDate] = React.useState<Date | null>(null);
  const [toDate, setToDate] = React.useState<Date | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <section className="stack">
        <div className="card empty-state">
          Missing inventory record not found.
        </div>
      </section>
    );
  }

  const fallbackRows: MissingRow[] = event.inventory
    .map((item) => ({
      id: item.id,
      name: item.name,
      unit: item.unit,
      issuedQty: item.issuedQty,
      returnedQty: item.returnedQty,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter((item) => item.missing > 0);

  const state =
    (location.state as MissingInventoryLocationState | null) ?? null;
  const missingRows = state?.missingRows ?? fallbackRows;

  // Optionally filter missingRows by event date if available
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
          <h1 className="hero-header-small">Missing Inventory Overview</h1>
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
      {missingRows.length === 0 ? (
        <div className="card empty-state">No missing items in this event.</div>
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "#f5f5f5" }}>
                <th style={{ textAlign: "left", padding: "8px" }}>Name</th>
                <th style={{ textAlign: "center", padding: "8px" }}>Missing</th>
                <th style={{ textAlign: "center", padding: "8px" }}>Unit</th>
                <th style={{ textAlign: "center", padding: "8px" }}>Issued</th>
                <th style={{ textAlign: "center", padding: "8px" }}>
                  Returned
                </th>
              </tr>
            </thead>
            <tbody>
              {missingRows.map((item) => (
                <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "8px" }}>{item.name}</td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    {item.missing}
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    {item.unit}
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    {item.issuedQty}
                  </td>
                  <td style={{ textAlign: "center", padding: "8px" }}>
                    {item.returnedQty}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
