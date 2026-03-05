import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
    padding: 12,
    borderBottomWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  col: { flex: 1 },
  label: {
    fontSize: 13,
    color: colors.text,
    marginBottom: 6,
    fontWeight: "700",
  },
  inputWrap: {
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    paddingVertical: 10,
    color: colors.text,
    fontWeight: "600",
  },
  btn: {
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  btnInner: {
    width: 42,
    height: 42,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
