import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingTop: 12 },
  // Dark variant - white text on dark/gradient backgrounds (EventFormScreen)
  label: {
    fontSize: 14,
    color: colors.title,
    marginBottom: 8,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  // Light variant - dark text on light backgrounds (LoginScreen, RegisterScreen)
  labelLight: {
    fontSize: 14,
    color: colors.title,
    marginBottom: 8,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  inputLight: {
    borderWidth: 2,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: colors.card,
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
});
