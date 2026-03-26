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
      elevation={1}
      sx={{
        p: 1,
        borderRadius: 2,
        mb: 0.5,
        background: "#fff",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
        minHeight: 0,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Stack direction="row" spacing={0.7} alignItems="center">
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
              sx={{ height: 36, width: 36 }}
              aria-label="Filter"
            >
              <SlidersHorizontal size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      </LocalizationProvider>
    </Paper>
  );
};

export default DateRangeFilter;
