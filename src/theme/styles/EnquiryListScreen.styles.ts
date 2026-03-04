import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
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
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
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
