import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: {
    flex: 1,
  },
  headerCard: {
    backgroundColor: colors.bgLight,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 12,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.title,
    marginBottom: 12,
    letterSpacing: 0.3,
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: colors.infoBg,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.info,
  },
  statLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.info,
  },
  searchWrap: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: colors.bgLight,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
  },
  search: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
});
