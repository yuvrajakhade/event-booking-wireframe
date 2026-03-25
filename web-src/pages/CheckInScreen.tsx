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
      <section className="stack">
        <div className="card empty-state">Check-in record not found.</div>
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
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <button
            type="button"
            className="icon-btn-ghost"
            onClick={() => navigate(-1)}
            aria-label="Back"
          >
            <ArrowLeft size={16} />
          </button>
          <h1 className="hero-header-small">Check-In</h1>
          <span className="hero-header-chip">{inventoryRows.length} Items</span>
        </span>
      </header>

      <article className="card check-main-head check-main-head-in">
        <span className="check-main-icon check-main-icon-in">
          <LogIn size={20} />
        </span>
        <h2>{event.venue}</h2>
        <p>{event.start.slice(0, 10)}</p>
      </article>

      {inventoryRows.map((row) => (
        <article className="card check-item-card" key={row.id}>
          <div className="check-item-head">
            <span className="check-item-icon">{iconForItem(row.label)}</span>
            <h3>{row.label}</h3>
          </div>
          <div className="check-counter-row">
            <button
              type="button"
              className="circle-btn circle-btn-minus"
              aria-label={`Decrease ${row.label}`}
              onClick={() => decrease(row.id)}
            >
              <Minus size={16} />
            </button>
            <strong>{issuedCounts[row.id] ?? 0}</strong>
            <button
              type="button"
              className="circle-btn circle-btn-plus"
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
        className="check-complete-btn check-complete-btn-in"
        onClick={completeCheckIn}
      >
        <Check size={18} />
        Complete Check-In
      </button>
    </section>
  );
}
