import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingTop: 12 },
  label: {
    fontSize: 13,
    color: "white",
    marginBottom: 8,
    fontWeight: "700",
  },
  input: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.4)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "white",
    fontSize: 15,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
});
