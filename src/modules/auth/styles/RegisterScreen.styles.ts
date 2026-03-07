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
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 40,
  },
  heroSection: {
    alignItems: "center",
    marginBottom: 40,
  },
  iconContainer: {
    marginBottom: 24,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: "800",
    color: colors.title,
    marginBottom: 8,
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    color: colors.subtitle,
    fontSize: 16,
    fontWeight: "500",
  },
  card: {
    backgroundColor: colors.bgLight,
    borderRadius: 24,
    padding: 28,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 8,
  },
  formSection: {
    gap: 4,
  },
  termsSection: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginHorizontal: 12,
    marginTop: 12,
    marginBottom: 12,
  },
  termsText: {
    flex: 1,
    color: colors.textLight,
    fontSize: 12,
    lineHeight: 16,
  },
  primaryBtn: {
    marginHorizontal: 12,
    marginTop: 16,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "700",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  divider: {
    marginVertical: 24,
    marginHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    color: colors.textLight,
    fontSize: 13,
    fontWeight: "500",
  },
  signInLink: {
    paddingVertical: 12,
    alignItems: "center",
  },
  signInLinkText: {
    color: colors.textLight,
    fontSize: 15,
    fontWeight: "500",
  },
  signInLinkBold: {
    fontWeight: "700",
    color: colors.secondary,
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
    paddingVertical: 12,
  },
  footerText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "500",
    letterSpacing: 0.3,
  },
});
