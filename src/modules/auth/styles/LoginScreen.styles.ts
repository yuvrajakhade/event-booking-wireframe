import { StyleSheet } from "react-native";
import { colors } from "../../../theme/colors";

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: 0,
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 40,
    paddingBottom: 20,
  },
  headerSection: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.15,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 2,
    borderColor: colors.border,
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.title,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sub: {
    color: colors.subtitle,
    fontSize: 15,
    fontWeight: "500",
  },
  formSection: {
    gap: 4,
  },
  forgotPassword: {
    alignSelf: "flex-end",
    marginRight: 12,
    marginTop: 4,
    marginBottom: 8,
  },
  forgotText: {
    color: colors.subtitle,
    fontSize: 14,
    fontWeight: "600",
  },
  primaryBtn: {
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: colors.button,
    shadowColor: colors.button,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "600",
    letterSpacing: 0.5,
    fontSize: 17,
    letterSpacing: 0.5,
  },
  divider: {
    marginVertical: 20,
    marginHorizontal: 12,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  registerLink: {
    paddingVertical: 12,
    alignItems: "center",
  },
  registerLinkText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  registerLinkBold: {
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.subtitle,
  },
  footer: {
    marginTop: 16,
    alignItems: "center",
    paddingVertical: 12,
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.9)",
    fontSize: 12,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
    letterSpacing: 0.3,
  },
});
