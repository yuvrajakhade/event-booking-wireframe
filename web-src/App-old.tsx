import React from "react";
import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom";
import { mockEnquiries, mockEvents } from "../src/data/mock";
import { Event, InventoryItem } from "../src/types";
import { MuhurtProvider, useMuhurt } from "./MuhurtContext";

const AUTH_KEY = "eventflow/authenticated";

type NavItem = {
  to: string;
  label: string;
};

const navItems: NavItem[] = [
  { to: "/events", label: "Events" },
  { to: "/enquiries", label: "Enquiries" },
  { to: "/completed", label: "Completed" },
  { to: "/inventory", label: "Inventory" },
  { to: "/muhurt", label: "Muhurt" },
  { to: "/notifications", label: "Notifications" },
  { to: "/profile", label: "Profile" },
];

function formatDate(input: string) {
  return new Date(input).toLocaleString(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function listMissing(event: Event) {
  return event.inventory
    .map((item) => ({
      item,
      missing: Math.max(0, item.issuedQty - item.returnedQty),
    }))
    .filter(({ missing }) => missing > 0);
}

function DashboardCards() {
  const upcoming = mockEvents.filter(
    (event) => event.status === "Upcoming",
  ).length;
  const completed = mockEvents.filter(
    (event) => event.status === "Completed",
  ).length;
  const openEnquiries = mockEnquiries.filter(
    (enquiry) => enquiry.status === "Open",
  ).length;

  return (
    <section className="cards-grid">
      <article className="card stat">
        <p>Upcoming Events</p>
        <h2>{upcoming}</h2>
      </article>
      <article className="card stat">
        <p>Completed Events</p>
        <h2>{completed}</h2>
      </article>
      <article className="card stat">
        <p>Open Enquiries</p>
        <h2>{openEnquiries}</h2>
      </article>
    </section>
  );
}

function EventsPage() {
  const upcoming = mockEvents.filter((event) => event.status !== "Completed");
  return (
    <section className="stack">
      <h1>Booked Events</h1>
      <DashboardCards />
      {upcoming.map((event) => (
        <article className="card" key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.customerName}</p>
          <p>{event.venue}</p>
          <small>
            {formatDate(event.start)} - {formatDate(event.end)}
          </small>
        </article>
      ))}
    </section>
  );
}

function EnquiriesPage() {
  return (
    <section className="stack">
      <h1>Enquiries</h1>
      {mockEnquiries.map((enquiry) => (
        <article className="card" key={enquiry.id}>
          <h3>{enquiry.name}</h3>
          <p>{enquiry.phone}</p>
          <p>Event Date: {enquiry.eventDate}</p>
          <p>
            Status: <strong>{enquiry.status}</strong>
          </p>
        </article>
      ))}
    </section>
  );
}

function CompletedPage() {
  const completed = mockEvents.filter((event) => event.status === "Completed");
  return (
    <section className="stack">
      <h1>Completed Events</h1>
      {completed.map((event) => (
        <article className="card" key={event.id}>
          <h3>{event.title}</h3>
          <p>{event.customerName}</p>
          <small>{formatDate(event.end)}</small>
        </article>
      ))}
    </section>
  );
}

function InventoryTable({ items }: { items: InventoryItem[] }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Planned</th>
            <th>Issued</th>
            <th>Returned</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.plannedQty}</td>
              <td>{item.issuedQty}</td>
              <td>{item.returnedQty}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InventoryPage() {
  const allItems = mockEvents.flatMap((event) => event.inventory);
  return (
    <section className="stack">
      <h1>Inventory Overview</h1>
      <InventoryTable items={allItems} />
    </section>
  );
}

function NotificationsPage() {
  const missing = mockEvents.flatMap((event) =>
    listMissing(event).map(({ item, missing: qty }) => ({
      id: `${event.id}-${item.id}`,
      event: event.title,
      item: item.name,
      qty,
    })),
  );

  return (
    <section className="stack">
      <h1>Notifications</h1>
      {missing.length === 0 ? <p className="card">No pending alerts.</p> : null}
      {missing.map((notice) => (
        <article className="card" key={notice.id}>
          <h3>{notice.event}</h3>
          <p>
            Missing {notice.qty} x {notice.item}
          </p>
        </article>
      ))}
    </section>
  );
}

function MuhurtPage() {
  const { muhurtDates, todayMuhurtDates, addMuhurtDate, removeMuhurtDate } =
    useMuhurt();
  const [date, setDate] = React.useState("");
  const [description, setDescription] = React.useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!date || !description.trim()) return;
    addMuhurtDate({ date, description: description.trim() });
    setDate("");
    setDescription("");
  };

  return (
    <section className="stack">
      <h1>Muhurt Dates</h1>
      {todayMuhurtDates.length > 0 ? (
        <p className="card attention">
          Today: {todayMuhurtDates.map((item) => item.description).join(", ")}
        </p>
      ) : null}
      <form className="card form-grid" onSubmit={onSubmit}>
        <label>
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Akshaya Tritiya"
          />
        </label>
        <button type="submit">Add Muhurt</button>
      </form>
      {muhurtDates.map((item) => (
        <article className="card row" key={item.id}>
          <div>
            <h3>{item.description}</h3>
            <small>{item.date}</small>
          </div>
          <button className="danger" onClick={() => removeMuhurtDate(item.id)}>
            Remove
          </button>
        </article>
      ))}
    </section>
  );
}

function ProfilePage({ onLogout }: { onLogout: () => void }) {
  return (
    <section className="stack">
      <h1>Profile</h1>
      <article className="card">
        <h3>Swojus Palace</h3>
        <p>Role: Admin</p>
        <button className="danger" onClick={onLogout}>
          Logout
        </button>
      </article>
    </section>
  );
}

function AppLayout({ onLogout }: { onLogout: () => void }) {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="topbar">
        <div>
          <p className="eyebrow">PWA Enabled</p>
          <h2>SWOJUS PALACE</h2>
        </div>
        <p>
          {location.pathname === "/" ? "Dashboard" : location.pathname.slice(1)}
        </p>
      </header>
      <nav className="tabs" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          return (
            <Link key={item.to} to={item.to} className={active ? "active" : ""}>
              {item.label}
            </Link>
          );
        })}
      </nav>
      <main className="content">
        <Routes>
          <Route path="/" element={<Navigate to="/events" replace />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/enquiries" element={<EnquiriesPage />} />
          <Route path="/completed" element={<CompletedPage />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/muhurt" element={<MuhurtPage />} />
          <Route path="/notifications" element={<NotificationsPage />} />
          <Route
            path="/profile"
            element={<ProfilePage onLogout={onLogout} />}
          />
          <Route path="*" element={<Navigate to="/events" replace />} />
        </Routes>
      </main>
    </div>
  );
}

function Login({ onLogin }: { onLogin: () => void }) {
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!name || !password) return;
    onLogin();
  };

  return (
    <section className="login-shell">
      <form className="card login-card" onSubmit={submit}>
        <p className="eyebrow">EventFlow</p>
        <h1>Sign In</h1>
        <label>
          Username
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Continue</button>
      </form>
    </section>
  );
}

export default function App() {
  const [authenticated, setAuthenticated] = React.useState(
    window.localStorage.getItem(AUTH_KEY) === "true",
  );

  const onLogin = React.useCallback(() => {
    window.localStorage.setItem(AUTH_KEY, "true");
    setAuthenticated(true);
  }, []);

  const onLogout = React.useCallback(() => {
    window.localStorage.removeItem(AUTH_KEY);
    setAuthenticated(false);
  }, []);

  if (!authenticated) {
    return <Login onLogin={onLogin} />;
  }

  return (
    <MuhurtProvider>
      <AppLayout onLogout={onLogout} />
    </MuhurtProvider>
  );
}
