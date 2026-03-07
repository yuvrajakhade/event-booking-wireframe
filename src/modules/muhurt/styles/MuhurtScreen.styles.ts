import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  addSection: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 20,
    padding: 20,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.title,
    marginBottom: 16,
  },
  addButton: {
    height: 52,
    borderRadius: 14,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 12,
    backgroundColor: colors.button,
    shadowColor: colors.button,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonIcon: {
    marginRight: 8,
  },
  addButtonText: {
    color: colors.bgLight,
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: 0.2,
  },
  listSection: {
    flex: 1,
    minHeight: 300,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.title,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  muhurtCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  muhurtContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  dateIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  muhurtDetails: {
    flex: 1,
  },
  muhurtDate: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.title,
    marginBottom: 4,
  },
  muhurtDescription: {
    fontSize: 14,
    color: colors.subtitle,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.title,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.subtitle,
    textAlign: "center",
  },
});
