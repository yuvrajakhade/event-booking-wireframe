import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    borderRadius: 12,
    marginHorizontal: 12,
    marginTop: 12,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleWrap: { flexDirection: "row", alignItems: "center", gap: 6 },
  title: { fontSize: 16, fontWeight: "700", color: colors.text },
  subtitle: { marginTop: 6, color: colors.muted, fontSize: 14 },
  metaRow: {
    marginTop: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  meta: { fontSize: 12, color: colors.muted },
  actions: { flexDirection: "row", gap: 10, marginTop: 10, flexWrap: "wrap" },
  actionBtn: {
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 10,
    backgroundColor: colors.bg,
  },
  actionText: { color: colors.primary, fontWeight: "600" },
});
