import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 12,
  },
  labelRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.title,
    letterSpacing: 0.3,
  },
  valueLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.subtitle,
  },
  toggleSwitch: {
    flexDirection: "row",
    backgroundColor: colors.bg,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.border,
    padding: 4,
    height: 54,
    alignItems: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 2,
  },
  toggleThumb: {
    position: "absolute",
    left: 4,
    width: "50%",
    height: 46,
    borderRadius: 20,
    backgroundColor: colors.button,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: colors.button,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
  thumbIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleLabel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  toggleText: {
    fontSize: 13,
    fontWeight: "500",
    color: colors.subtitle,
    letterSpacing: 0.2,
  },
  toggleTextActive: {
    color: colors.title,
    fontWeight: "600",
  },
});
