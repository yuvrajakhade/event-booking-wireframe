import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AuthHeader from "../components/AuthHeader";
import FormRow from "../components/FormRow";
import { colors } from "../theme/colors";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={["#667eea", "#764ba2", "#f093fb"] as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <View style={styles.headerSection}>
            <AuthHeader />
          </View>

          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <View style={styles.iconCircle}>
                <Ionicons name="lock-closed" size={24} color="#667eea" />
              </View>
              <Text style={styles.title}>Login</Text>
              <Text style={styles.sub}>Enter your credentials below</Text>
            </View>

            <View style={styles.formSection}>
              <FormRow
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="yourname@example.com"
                variant="light"
              />
              <FormRow
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Enter your password"
                secureTextEntry
                variant="light"
              />

              <Pressable style={styles.forgotPassword}>
                <Text style={styles.forgotText}>Forgot Password?</Text>
              </Pressable>

              <Pressable onPress={onLogin}>
                <LinearGradient
                  colors={["#667eea", "#764ba2"] as any}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="log-in" size={20} color="white" />
                  <Text style={styles.primaryBtnText}>Sign In</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                style={styles.registerLink}
                onPress={() => navigation.navigate("Register")}
              >
                <Text style={styles.registerLinkText}>
                  Don't have an account?{" "}
                  <Text style={styles.registerLinkBold}>Sign Up</Text>
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by SWOJUS PALACE</Text>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 40,
  },
  headerSection: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 32,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.4,
    shadowRadius: 30,
    elevation: 15,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  cardHeader: {
    alignItems: "center",
    marginBottom: 24,
  },
  iconCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
    borderWidth: 3,
    borderColor: "rgba(102, 126, 234, 0.2)",
  },
  title: {
    fontSize: 30,
    fontWeight: "900",
    color: colors.text,
    marginBottom: 6,
    letterSpacing: 0.5,
  },
  sub: {
    color: colors.muted,
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
    color: "#667eea",
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
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    elevation: 8,
  },
  primaryBtnText: {
    color: "white",
    fontWeight: "800",
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
    color: "#333333",
    fontSize: 15,
    fontWeight: "500",
  },
  registerLinkBold: {
    fontWeight: "700",
    color: "#667eea",
  },
  footer: {
    marginTop: 32,
    alignItems: "center",
  },
  footerText: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 13,
    fontWeight: "600",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
