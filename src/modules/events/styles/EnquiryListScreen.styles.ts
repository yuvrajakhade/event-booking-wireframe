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
  minimalHeader: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  minimalTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.title,
  },
  searchWrap: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: colors.card,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colors.border,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  search: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
  },
});
