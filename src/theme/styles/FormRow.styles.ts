import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingTop: 12 },
  // Dark variant - white text on dark/gradient backgrounds (EventFormScreen)
  label: {
    fontSize: 13,
    color: "white",
    marginBottom: 8,
    fontWeight: "700",
  },
  input: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  // Light variant - dark text on light backgrounds (LoginScreen, RegisterScreen)
  labelLight: {
    fontSize: 13,
    color: "#333333",
    marginBottom: 8,
    fontWeight: "700",
  },
  inputLight: {
    borderWidth: 2,
    borderColor: "#667eea",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "rgba(102, 126, 234, 0.05)",
    color: "#333333",
    fontSize: 15,
    fontWeight: "600",
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
});
