import React from "react";
import { useMuhurt } from "../MuhurtContext";
import { CalendarDays, Plus, Trash2 } from "lucide-react";
import "../styles/modules/_material-muhurt.css";

export function MuhurtScreen() {
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
    <section className="material-stack">
      {todayMuhurtDates.length > 0 && (
        <div className="material-card material-attention">
          <h3 className="material-title">Today's Muhurt</h3>
          <p className="material-desc">
            {todayMuhurtDates.map((item) => item.description).join(", ")}
          </p>
        </div>
      )}
      <form className="material-card material-form" onSubmit={onSubmit}>
        <h3 className="material-title">Add New Muhurt Date</h3>
        <div className="material-form-group">
          <label className="material-label" htmlFor="muhurt-date">
            Date (YYYY-MM-DD)
          </label>
          <input
            id="muhurt-date"
            className="material-input"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="material-form-group">
          <label className="material-label" htmlFor="muhurt-desc">
            Description
          </label>
          <input
            id="muhurt-desc"
            className="material-input"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Akshaya Tritiya"
            required
          />
        </div>
        <button type="submit" className="material-btn material-btn-primary">
          <Plus size={18} />
          Add Muhurt Date
        </button>
      </form>
      <h2 className="material-list-heading">
        Saved Muhurt Dates ({muhurtDates.length})
      </h2>
      <div className="material-stack">
        {muhurtDates.length === 0 ? (
          <div className="material-card material-empty">
            No Muhurt dates added yet.
          </div>
        ) : (
          muhurtDates.map((item) => (
            <article
              className="material-card material-row saved-date-row"
              key={item.id}
            >
              <div className="material-tile-icon">
                <CalendarDays size={20} />
              </div>
              <div className="material-saved-date-copy">
                <h3 className="material-date">{item.date}</h3>
                <small className="material-desc">{item.description}</small>
              </div>
              <button
                type="button"
                className="material-icon-btn material-danger"
                onClick={() => removeMuhurtDate(item.id)}
                aria-label="Delete Muhurt date"
              >
                <Trash2 size={20} />
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
