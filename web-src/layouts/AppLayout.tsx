import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Bell,
  Building2,
  CalendarDays,
  MessageCircle,
  Sparkles,
  Trophy,
  UserCircle2,
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  to: string;
  label: string;
  icon: LucideIcon;
};

const navItems: NavItem[] = [
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/enquiries", label: "Enquiries", icon: MessageCircle },
  { to: "/completed", label: "Completed", icon: Trophy },
  { to: "/inventory", label: "Inventory", icon: LayoutGrid },
  { to: "/muhurt", label: "Muhurt", icon: Sparkles },
];

export function AppLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();

  return (
    <div className="app-container">
      <header className="topbar">
        <Link
          to="/profile"
          className="topbar-icon profile-icon"
          title="Profile"
          aria-label="Profile"
        >
          <UserCircle2 size={20} />
        </Link>
        <h2 className="brand-pill">
          <Building2 size={18} />
          <span>SWOJUS PALACE</span>
        </h2>
        <Link
          to="/notifications"
          className="topbar-icon notification-icon"
          title="Notifications"
          aria-label="Notifications"
        >
          <Bell size={20} />
        </Link>
      </header>
      <main className="content">{children}</main>
      <nav className="bottom-tabs" aria-label="Main navigation">
        {navItems.map((item) => {
          const active = location.pathname === item.to;
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={`tab-link ${active ? "active" : ""}`}
            >
              <span className="tab-icon">
                <Icon size={21} strokeWidth={2.2} />
              </span>
              <span className="tab-label">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
