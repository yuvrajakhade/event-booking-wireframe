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
    maxHeight: 400,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 10,
    backgroundColor: colors.card,
    overflow: "hidden",
  },
  section: {
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.bg,
  },
  sectionTitle: {
    fontWeight: "700",
    color: colors.text,
    fontSize: 14,
  },
  sectionTitleActive: {
    color: colors.primary,
  },
  roomsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingHorizontal: 8,
    paddingVertical: 8,
    gap: 6,
  },
  roomItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    width: "48%",
  },
  roomItemActive: {
    backgroundColor: colors.bg,
    borderColor: colors.primary,
  },
  roomText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
  },
  roomTextActive: {
    color: colors.primary,
    fontWeight: "700",
  },
});
