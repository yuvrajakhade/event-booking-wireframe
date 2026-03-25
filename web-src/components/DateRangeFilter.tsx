import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";

interface DateRangeFilterProps {
  onFilter: (from: Date | null, to: Date | null) => void;
}

const DateRangeFilter: React.FC<DateRangeFilterProps> = ({ onFilter }) => {
  const [from, setFrom] = useState<Date | null>(null);
  const [to, setTo] = useState<Date | null>(null);

  const handleFilter = () => {
    onFilter(from, to);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="from-date">From</label>
        <DatePicker
          id="from-date"
          selected={from}
          onChange={(date: React.SetStateAction<Date | null>) => setFrom(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select start date"
        />
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label htmlFor="to-date">To</label>
        <DatePicker
          id="to-date"
          selected={to}
          onChange={(date: React.SetStateAction<Date | null>) => setTo(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="Select end date"
        />
      </div>
      <button
        style={{
          height: 40,
          width: 40,
          borderRadius: 8,
          background: "#6C63FF",
          color: "white",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
        }}
        onClick={handleFilter}
        aria-label="Filter"
      >
        <span role="img" aria-label="filter">
          ⏵
        </span>
      </button>
    </div>
  );
};

export default DateRangeFilter;
