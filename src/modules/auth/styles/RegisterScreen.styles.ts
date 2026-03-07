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
    marginBottom: 12,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: 32,
    padding: 18,
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "900",
    color: colors.title,
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  sub: {
    color: colors.subtitle,
    fontSize: 15,
    fontWeight: "500",
  },
  formSection: {
    gap: 2,
  },
  termsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginHorizontal: 12,
    marginTop: 8,
    marginBottom: 8,
  },
  termsText: {
    flex: 1,
    color: colors.subtitle,
    fontSize: 12,
    lineHeight: 16,
  },
  primaryBtn: {
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 16,
    borderRadius: 16,
    backgroundColor: colors.button,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
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
  signInLink: {
    paddingVertical: 12,
    alignItems: "center",
  },
  signInLinkText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "500",
  },
  signInLinkBold: {
    fontWeight: "600",
    letterSpacing: 0.5,
    color: colors.subtitle,
  },
  footer: {
    marginTop: 16,
    marginBottom: 12,
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
