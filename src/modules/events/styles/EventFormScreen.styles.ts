import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  container: { flex: 1 },
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
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 12,
    gap: 10,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#6B7A3A",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#6B7A3A",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  section: {
    fontSize: 18,
    fontWeight: "600",
    color: colors.title,
    letterSpacing: 0.5,
    flex: 1,
  },
  spacer: {
    height: 24,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnCancel: {
    backgroundColor: colors.button,
    borderRadius: 12,
  },
  btnCreate: {
    borderWidth: 0,
    backgroundColor: colors.button,
  },
  btnInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelText: {
    color: "white",
  },
  btnCreateText: {
    color: "white",
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
    letterSpacing: 0.5,
  },
});
