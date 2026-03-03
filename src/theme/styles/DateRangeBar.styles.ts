import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-end",
    padding: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
  },
  col: { flex: 1 },
  label: { fontSize: 12, color: colors.muted, marginBottom: 4 },
  inputWrap: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    backgroundColor: colors.bg,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
  },
  input: { flex: 1, paddingVertical: 8, color: colors.text },
  btn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  btnText: { color: "white", fontWeight: "600" },
});
