import { StyleSheet } from "react-native";
import { colors } from "../colors";

export const styles = StyleSheet.create({
  container: {
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.card,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    justifyContent: "flex-start",
  },
  logoWrap: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: colors.primary,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  name: {
    fontSize: 18,
    fontWeight: "900",
    color: colors.text,
  },
});
