import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  cardContainer: {
    marginHorizontal: 12,
    marginTop: 12,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 6,
    overflow: "hidden",
  },
  gradient: {
    borderRadius: 20,
    backgroundColor: colors.card,
  },
  card: {
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 10 },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.title,
    flex: 1,
    letterSpacing: 0.3,
  },
  titleDetailed: {
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.3,
    color: colors.title,
    marginBottom: 10,
  },
  subtitle: {
    marginTop: 8,
    color: colors.subtitle,
    fontSize: 14,
    lineHeight: 20,
  },
  detailedFieldsContainer: {
    gap: 6,
  },
  detailedField: {
    flexDirection: "row",
    alignItems: "center",
  },
  fieldIcon: {
    marginRight: 8,
  },
  detailedLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.secondary,
    minWidth: 75,
  },
  detailedValue: {
    fontSize: 13,
    color: "#8C9F8E",
    flex: 1,
  },
  metaRow: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  meta: { fontSize: 13, color: colors.text, fontWeight: "600" },
  actions: { flexDirection: "row", gap: 10, marginTop: 14, flexWrap: "wrap" },
  actionBtn: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  actionBtnIconOnly: {
    borderRadius: 10,
  },
  actionBtnGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  actionBtnGradientIconOnly: {
    width: 42,
    height: 42,
    paddingHorizontal: 0,
    paddingVertical: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  actionText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
    letterSpacing: 0.3,
  },
});
