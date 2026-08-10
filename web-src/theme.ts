import { createTheme } from "@mui/material/styles";

const getCssVar = (name: string, fallback: string) => {
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
};

// Use CSS variables from :root for palette colors
const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: getCssVar("--brand", "#D4A03B"),
    },
    secondary: {
      main: getCssVar("--teal", "#F0C66B"),
    },
    error: {
      main: getCssVar("--danger", "#F15A24"),
    },
    warning: {
      main: getCssVar("--warning", "#F0C66B"),
    },
    success: {
      main: getCssVar("--success", "#34d399"),
    },
    background: {
      default: getCssVar("--bg", "#ffffff"),
      paper: getCssVar("--surface", "#ffffff"),
    },
    text: {
      primary: getCssVar("--text", "#120808"),
      secondary: getCssVar("--muted", "#6b5a4a"),
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
