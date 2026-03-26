import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../../src/data/mock";
import {
  ArrowLeft,
  BedSingle,
  Minus,
  Plus,
  LogIn,
  Shirt,
  UtensilsCrossed,
  Square,
  Check,
} from "lucide-react";
import "../styles/modules/_material-muhurt.css";

type IssuedRow = {
  id: string;
  label: string;
  unit: string;
  issued: number;
};

const ITEM_ICON_SIZE = 12;

const iconByName: Record<string, React.ReactNode> = {
  chair: <Square size={ITEM_ICON_SIZE} />,
  table: <Square size={ITEM_ICON_SIZE} />,
  mic: <Square size={ITEM_ICON_SIZE} />,
  projector: <Square size={ITEM_ICON_SIZE} />,
  bedsheet: <BedSingle size={ITEM_ICON_SIZE} />,
  "extra bed": <BedSingle size={ITEM_ICON_SIZE} />,
  runner: <Square size={ITEM_ICON_SIZE} />,
  pillows: <Square size={ITEM_ICON_SIZE} />,
  cushion: <Square size={ITEM_ICON_SIZE} />,
  duvets: <Square size={ITEM_ICON_SIZE} />,
  towels: <Shirt size={ITEM_ICON_SIZE} />,
  napkins: <UtensilsCrossed size={ITEM_ICON_SIZE} />,
};

function iconForItem(name: string) {
  return iconByName[name.toLowerCase()] ?? <Square size={ITEM_ICON_SIZE} />;
}

export function CheckInScreen() {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <section className="material-stack">
        <div className="material-card material-empty">
          Check-in record not found.
        </div>
      </section>
    );
  }

  const inventoryRows = React.useMemo<IssuedRow[]>(
    () =>
      event.inventory.map((item) => ({
        id: item.id,
        label: item.name,
        unit: item.unit,
        issued: item.issuedQty,
      })),
    [event.inventory],
  );

  const [issuedCounts, setIssuedCounts] = React.useState<
    Record<string, number>
  >(() => Object.fromEntries(inventoryRows.map((item) => [item.id, 0])));

  const decrease = (id: string) => {
    setIssuedCounts((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const increase = (id: string) => {
    setIssuedCounts((prev) => ({ ...prev, [id]: prev[id] + 1 }));
  };

  const completeCheckIn = () => {
    navigate(`/events/${event.id}/check-out`, {
      state: {
        issuedCounts,
      },
    });
  };

  return (
    <section className="material-stack">
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: ".7rem",
          padding: "0.7rem 0.7rem 0.2rem 0.7rem",
        }}
      >
        <button
          type="button"
          className="material-icon-btn"
          onClick={() => navigate(-1)}
          aria-label="Back"
        >
          <ArrowLeft size={18} />
        </button>
        <h1
          className="material-title"
          style={{ margin: 0, fontSize: "1.08rem" }}
        >
          Check-In
        </h1>
      </div>

      <article
        className="material-card material-attention event-info-card"
        style={{
          alignItems: "center",
          textAlign: "center",
          padding: "0.7rem 0.7rem",
        }}
      >
        <h2
          className="material-title"
          style={{ margin: 0, fontSize: "1.08rem" }}
        >
          {event.venue}
        </h2>
        <p className="material-desc" style={{ margin: 0, fontSize: "0.98rem" }}>
          {event.start.slice(0, 10)}
        </p>
      </article>

      {inventoryRows.map((row) => (
        <article
          className="material-card material-row"
          key={row.id}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: ".7rem" }}>
            <span className="material-tile-icon">{iconForItem(row.label)}</span>
            <h3
              className="material-title"
              style={{ fontSize: "1.08rem", margin: 0 }}
            >
              {row.label}
            </h3>
            <span style={{ fontSize: ".95rem", color: "#888" }}>
              {row.unit}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
            <button
              type="button"
              className="material-icon-btn"
              aria-label={`Decrease ${row.label}`}
              onClick={() => decrease(row.id)}
            >
              <Minus size={16} />
            </button>
            <strong style={{ minWidth: 24, textAlign: "center" }}>
              {issuedCounts[row.id] ?? 0}
            </strong>
            <button
              type="button"
              className="material-icon-btn"
              aria-label={`Increase ${row.label}`}
              onClick={() => increase(row.id)}
            >
              <Plus size={16} />
            </button>
          </div>
        </article>
      ))}

      <button
        type="button"
        className="material-btn material-btn-primary"
        style={{ margin: "0 auto", width: "100%", maxWidth: 480 }}
        onClick={completeCheckIn}
      >
        <Check size={18} />
        Complete Check-In
      </button>
    </section>
  );
}
