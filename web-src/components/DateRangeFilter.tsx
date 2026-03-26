import React, { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import TextField from "@mui/material/TextField";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Stack, IconButton, Paper, Tooltip } from "@mui/material";

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
    <Paper
      elevation={3}
      sx={{
        p: 2,
        borderRadius: 3,
        mb: 2,
        background: "#fff",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        minHeight: 0,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <DatePicker
            label="From"
            value={from}
            onChange={setFrom}
            slotProps={{ textField: { variant: "outlined", size: "small" } }}
          />
          <DatePicker
            label="To"
            value={to}
            onChange={setTo}
            slotProps={{ textField: { variant: "outlined", size: "small" } }}
          />
          <Tooltip title="Apply Filter">
            <IconButton
              color="primary"
              onClick={handleFilter}
              sx={{ height: 48, width: 48 }}
              aria-label="Filter"
            >
              <SlidersHorizontal size={22} />
            </IconButton>
          </Tooltip>
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
};

export default DateRangeFilter;
