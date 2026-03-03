import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.muted,
    marginBottom: 8,
  },
  toggleContainer: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: colors.card,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    backgroundColor: colors.card,
  },
  optionActive: {
    backgroundColor: colors.bg,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.muted,
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
  divider: {
    width: 1,
    backgroundColor: colors.border,
  },
});
