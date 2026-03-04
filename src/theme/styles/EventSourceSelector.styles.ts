import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    marginVertical: 8,
  },
  label: {
    fontSize: 13,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  toggleContainer: {
    flexDirection: "row",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 14,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  option: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    paddingHorizontal: 12,
    backgroundColor: "white",
  },
  optionActive: {
    backgroundColor: colors.primaryLight,
  },
  optionText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  optionTextActive: {
    color: "white",
    fontWeight: "800",
  },
  divider: {
    width: 2,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
