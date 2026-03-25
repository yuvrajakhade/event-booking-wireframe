import React from "react";
import { mockEvents } from "../../src/data/mock";
import { Event } from "../../src/types";
import { BellOff } from "lucide-react";

function listMissing(event: Event) {
  return event.inventory
    .map((item) => ({
      item,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter(({ missing }) => missing > 0);
}

export function NotificationsScreen() {
  const missing = mockEvents.flatMap((event) =>
    listMissing(event).map(({ item, missing: qty }) => ({
      id: `${event.id}-${item.id}`,
      event: event.title,
      item: item.name,
      qty,
    })),
  );

  const affectedEvents = new Set(missing.map((item) => item.event)).size;
  const totalMissingUnits = missing.reduce((sum, item) => sum + item.qty, 0);

  return (
    <section className="stack notifications-screen">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Notifications</h1>
          <span className="hero-header-chip">
            {affectedEvents} Events &bull;
            {totalMissingUnits} Missing
          </span>
        </span>
      </header>

      {missing.length === 0 ? (
        <div className="notifications-empty">
          <BellOff size={44} />
          <h3>No notifications for today</h3>
          <p>You will see Muhurt reminders here when a date matches today.</p>
        </div>
      ) : (
        <>
          <p className="subtitle warning-subtitle">
            Active alerts: {missing.length} • Events: {affectedEvents} • Missing
            units: {totalMissingUnits}
          </p>
          {missing.map((notice) => (
            <article className="card" key={notice.id}>
              <h3>{notice.event}</h3>
              <p className="notification-message">
                Missing {notice.qty} x {notice.item}
              </p>
            </article>
          ))}
        </>
      )}
    </section>
  );
}
