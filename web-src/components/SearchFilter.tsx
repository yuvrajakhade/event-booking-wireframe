import React from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Search } from "lucide-react";

import { SxProps } from "@mui/material";

interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  sx?: SxProps;
}

const SearchFilter: React.FC<SearchFilterProps> = ({
  value,
  onChange,
  placeholder,
  className,
  sx,
}) => {
  return (
    <TextField
      variant="outlined"
      size="small"
      fullWidth
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder || "Search..."}
      className={className}
      sx={{ mb: 0.5, mt: 0, py: 0, ...((sx as object) || {}) }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search size={18} />
          </InputAdornment>
        ),
        endAdornment: value ? (
          <InputAdornment position="end">
            <span
              style={{ cursor: "pointer", fontWeight: 700, color: "#888" }}
              onClick={() => onChange("")}
              aria-label="Clear search"
            >
              ×
            </span>
          </InputAdornment>
        ) : null,
      }}
    />
  );
};

export default SearchFilter;
