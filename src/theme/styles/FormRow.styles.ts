import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: { paddingHorizontal: 12, paddingTop: 12 },
  label: {
    fontSize: 13,
    color: "white",
    marginBottom: 8,
    fontWeight: "700",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 14,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    color: colors.text,
    fontSize: 15,
    fontWeight: "600",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
