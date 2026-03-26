import { createTheme } from "@mui/material/styles";

// Use CSS variables from :root for palette colors
const theme = createTheme({
  palette: {
    primary: {
      main:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--brand",
        ) || "#6366f1",
    },
    secondary: {
      main:
        getComputedStyle(document.documentElement).getPropertyValue("--teal") ||
        "#14b8a6",
    },
    error: {
      main:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--danger",
        ) || "#ef4444",
    },
    warning: {
      main:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--warning",
        ) || "#f59e0b",
    },
    success: {
      main:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--success",
        ) || "#10b981",
    },
    background: {
      default:
        getComputedStyle(document.documentElement).getPropertyValue("--bg") ||
        "#eceef6",
      paper:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--surface",
        ) || "#f8f9ff",
    },
    text: {
      primary:
        getComputedStyle(document.documentElement).getPropertyValue("--text") ||
        "#273042",
      secondary:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--muted",
        ) || "#6f7686",
    },
  },
  typography: {
    fontFamily: [
      "Manrope",
      "Sora",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});

export default theme;
