import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { mockEvents } from "../../src/data/mock";
import {
  ArrowLeft,
  BedSingle,
  Minus,
  Plus,
  LogOut,
  Shirt,
  UtensilsCrossed,
  Square,
  Check,
  AlertCircle,
} from "lucide-react";

type CheckoutLocationState = {
  issuedCounts?: Record<string, number>;
};

type CheckoutRow = {
  id: string;
  label: string;
  unit: string;
  expected: number;
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

export function CheckOutScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const { eventId } = useParams();
  const event = mockEvents.find((item) => item.id === eventId);

  if (!event) {
    return (
      <section className="stack">
        <div className="card empty-state">Check-out record not found.</div>
      </section>
    );
  }

  const state = (location.state as CheckoutLocationState | null) ?? null;
  const issuedCounts = state?.issuedCounts;

  const rows = React.useMemo<CheckoutRow[]>(
    () =>
      event.inventory.map((item) => ({
        id: item.id,
        label: item.name,
        unit: item.unit,
        expected: Math.max(0, issuedCounts?.[item.id] ?? item.issuedQty),
      })),
    [event.inventory, issuedCounts],
  );

  const [returnedCounts, setReturnedCounts] = React.useState<
    Record<string, number>
  >(() => Object.fromEntries(rows.map((row) => [row.id, 0])));

  const decrease = (id: string) => {
    setReturnedCounts((prev) => ({ ...prev, [id]: Math.max(0, prev[id] - 1) }));
  };

  const increase = (id: string) => {
    setReturnedCounts((prev) => {
      const expected = rows.find((row) => row.id === id)?.expected ?? 0;
      const next = Math.min(expected, prev[id] + 1);
      return { ...prev, [id]: next };
    });
  };

  const completeCheckOut = () => {
    const missingRows = rows
      .map((row) => {
        const returned = returnedCounts[row.id] ?? 0;
        const missing = Math.max(0, row.expected - returned);

        return {
          id: row.id,
          name: row.label,
          unit: row.unit,
          issuedQty: row.expected,
          returnedQty: returned,
          missing,
        };
      })
      .filter((row) => row.missing > 0);

    navigate(`/inventory/missing/${event.id}`, {
      state: {
        missingRows,
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
          <h1 className="hero-header-small">Check-Out</h1>
          <span className="hero-header-chip">{rows.length} Items</span>
        </span>
      </header>

      <article className="card check-inline-head">
        <span className="check-inline-strip" />
        <h2>{event.venue}</h2>
        <p>{event.end.slice(0, 10)} • Count returned items</p>
      </article>

      {rows.map((row) => {
        const returned = returnedCounts[row.id] ?? 0;
        const missing = Math.max(0, row.expected - returned);

        return (
          <article
            className="card check-item-card checkout-item-card"
            key={row.id}
          >
            <div className="check-item-head checkout-item-head">
              <div className="checkout-title-wrap">
                <span className="check-item-icon">
                  {iconForItem(row.label)}
                </span>
                <h3>{row.label}</h3>
              </div>
              <span className="expected-pill">Expected: {row.expected}</span>
            </div>

            <div className="check-counter-row checkout-counter-row">
              <div className="checkout-counter-controls">
                <button
                  type="button"
                  className="circle-btn circle-btn-minus"
                  aria-label={`Decrease ${row.label}`}
                  onClick={() => decrease(row.id)}
                >
                  <Minus size={16} />
                </button>
                <strong>{returned}</strong>
                <button
                  type="button"
                  className="circle-btn circle-btn-plus"
                  aria-label={`Increase ${row.label}`}
                  onClick={() => increase(row.id)}
                >
                  <Plus size={16} />
                </button>
              </div>

              <span className="missing-pill">
                <AlertCircle size={12} />-{missing}
              </span>
            </div>
          </article>
        );
      })}

      <button
        type="button"
        className="check-complete-btn check-complete-btn-out"
        onClick={completeCheckOut}
      >
        <Check size={18} />
        Complete Check-Out
      </button>
    </section>
  );
}
