import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: {
    paddingHorizontal: 12,
    paddingTop: 12,
    marginBottom: 8,
  },
  // Dark variant - for dark/gradient backgrounds
  label: {
    fontSize: 14,
    color: colors.title,
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  input: {
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.bgLight,
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  // Light variant - for light backgrounds
  labelLight: {
    fontSize: 14,
    color: colors.title,
    marginBottom: 10,
    fontWeight: "600",
    letterSpacing: 0.3,
  },
  inputLight: {
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 12,
    backgroundColor: colors.bg,
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
    letterSpacing: 0.2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
});
