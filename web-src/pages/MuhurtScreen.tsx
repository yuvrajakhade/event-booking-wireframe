import React from "react";
import { useMuhurt } from "../MuhurtContext";
import { CalendarDays, Plus, Trash2 } from "lucide-react";

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
    <section className="stack">
      {todayMuhurtDates.length > 0 && (
        <div className="card attention">
          <h3>Today's Muhurt</h3>
          <p>{todayMuhurtDates.map((item) => item.description).join(", ")}</p>
        </div>
      )}
      <form className="card form-grid muhurt-form" onSubmit={onSubmit}>
        <h3>Add New Muhurt Date</h3>
        <label>
          Date (YYYY-MM-DD)
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Example: Akshaya Tritiya"
            required
          />
        </label>
        <button type="submit" className="btn-add-wide">
          <Plus size={18} />
          Add Muhurt Date
        </button>
      </form>
      <h2 className="list-heading">
        Saved Muhurt Dates ({muhurtDates.length})
      </h2>
      <div className="stack">
        {muhurtDates.length === 0 ? (
          <div className="card empty-state">No Muhurt dates added yet.</div>
        ) : (
          muhurtDates.map((item) => (
            <article className="card row saved-date-row" key={item.id}>
              <div className="tile-icon">
                <CalendarDays size={18} />
              </div>
              <div className="saved-date-copy">
                <h3>{item.date}</h3>
                <small>{item.description}</small>
              </div>
              <button
                type="button"
                className="icon-btn-ghost danger-text"
                onClick={() => removeMuhurtDate(item.id)}
                aria-label="Delete Muhurt date"
              >
                <Trash2 size={18} />
              </button>
            </article>
          ))
        )}
      </div>
    </section>
  );
}
