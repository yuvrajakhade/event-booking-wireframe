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
    <div className="compact-date-filter">
      <div className="compact-date-fields">
        <div className="date-field no-label compact-input">
          <span className="date-input-icon">
            <CalendarDays size={14} />
          </span>
          <DatePicker
            id="from-date"
            selected={from}
            onChange={(date: React.SetStateAction<Date | null>) =>
              setFrom(date)
            }
            dateFormat="yyyy-MM-dd"
            placeholderText="From"
            className="date-input compact-input"
            popperPlacement="bottom"
          />
        </div>
        {/* Removed 'to' label for cleaner look */}
        <div className="date-field no-label compact-input">
          <span className="date-input-icon">
            <CalendarDays size={14} />
          </span>
          <DatePicker
            id="to-date"
            selected={to}
            onChange={(date: React.SetStateAction<Date | null>) => setTo(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="To"
            className="date-input compact-input"
            popperPlacement="bottom"
          />
        </div>
        <button
          type="button"
          className="btn-icon filter-btn compact-btn"
          onClick={handleFilter}
          aria-label="Filter"
        >
          <SlidersHorizontal size={16} />
        </button>
      </div>
    </div>
  );
};

export default DateRangeFilter;
