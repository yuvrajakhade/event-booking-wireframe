import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDays, SlidersHorizontal } from "lucide-react";

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
    <div className="date-filter-fields compact-date-fields">
      <div className="date-field no-label">
        <span className="date-input-icon">
          <CalendarDays size={16} />
        </span>
        <DatePicker
          id="from-date"
          selected={from}
          onChange={(date: React.SetStateAction<Date | null>) => setFrom(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          className="date-input"
          popperPlacement="bottom"
        />
      </div>
      <span className="date-separator">to</span>
      <div className="date-field no-label">
        <span className="date-input-icon">
          <CalendarDays size={16} />
        </span>
        <DatePicker
          id="to-date"
          selected={to}
          onChange={(date: React.SetStateAction<Date | null>) => setTo(date)}
          dateFormat="yyyy-MM-dd"
          placeholderText="YYYY-MM-DD"
          className="date-input"
          popperPlacement="bottom"
        />
      </div>
      <button
        type="button"
        className="btn-icon filter-btn"
        onClick={handleFilter}
        aria-label="Filter"
      >
        <SlidersHorizontal size={20} />
      </button>
    </div>
  );
};

export default DateRangeFilter;
