import React from "react";
import {
  Building2,
  LogOut,
  Mail,
  Phone,
  ShieldCheck,
  UserCircle2,
} from "lucide-react";

type ProfileScreenProps = {
  onLogout: () => void;
};

export function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <section className="stack">
      <header className="card hero-card hero-header-row">
        <span className="hero-header-inline">
          <h1 className="hero-header-small">Profile</h1>
        </span>
      </header>
      <article className="card profile-card">
        <div className="profile-top">
          <div className="avatar-tile">
            <UserCircle2 size={52} />
          </div>
          <div>
            <h2>Event Manager</h2>
            <p className="hero-chip small-chip">
              <ShieldCheck size={15} />
              Admin
            </p>
          </div>
        </div>

        <div className="profile-line-item profile-mail">
          <span className="profile-line-icon">
            <Mail size={18} />
          </span>
          manager@example.com
        </div>

        <div className="profile-line-item profile-phone">
          <span className="profile-line-icon">
            <Phone size={18} />
          </span>
          +91 99999 99999
        </div>

        <div className="profile-line-item profile-role">
          <span className="profile-line-icon">
            <Building2 size={18} />
          </span>
          Event Operations
        </div>

        <button className="danger logout-btn" onClick={onLogout}>
          <LogOut size={18} />
          Logout
        </button>
      </article>
      <article className="card security-card">
        <h3>Security</h3>
        <p className="profile-line">Session status: Active</p>
        <p className="profile-line">Last login: Today</p>
      </article>
    </section>
  );
}
