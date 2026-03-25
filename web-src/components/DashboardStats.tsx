import React from "react";
import { CircleAlert } from "lucide-react";

type DashboardStatsProps = {
  stats: Array<{
    label: string;
    value: number | string;
    icon?: string;
  }>;
};

export function DashboardStats({ stats }: DashboardStatsProps) {
  return (
    <section className="cards-grid">
      {stats.map((stat, index) => (
        <article className="card stat stat-card" key={index}>
          <div className="stat-icon-wrap">
            {stat.icon ? <span>{stat.icon}</span> : <CircleAlert size={16} />}
          </div>
          <p className="stat-label">{stat.label}</p>
          <h2 className="stat-value">{stat.value}</h2>
        </article>
      ))}
    </section>
  );
}
