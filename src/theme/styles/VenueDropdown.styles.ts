import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: { paddingHorizontal: 12, marginVertical: 8 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.muted,
    marginBottom: 6,
  },
  input: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.card,
  },
  inputActive: {
    borderColor: colors.primary,
    backgroundColor: colors.bg,
  },
  inputText: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
  },
  placeholder: {
    color: colors.muted,
  },
  dropdown: {
    marginTop: 4,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.card,
    overflow: "hidden",
    zIndex: 1000,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  optionActive: {
    backgroundColor: colors.bg,
  },
  optionText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
  optionTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});
