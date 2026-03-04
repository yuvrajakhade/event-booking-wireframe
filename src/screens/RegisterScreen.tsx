import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AuthHeader from "../components/AuthHeader";
import FormRow from "../components/FormRow";
import { colors } from "../theme/colors";

type RegisterScreenProps = {
  onRegister: () => void;
};

export default function RegisterScreen({ onRegister }: RegisterScreenProps) {
  const navigation = useNavigation<any>();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <LinearGradient
      colors={["#f093fb", "#f5576c", "#ff6a95"] as any}
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
              <Text style={styles.title}>Create Account</Text>
              <Text style={styles.sub}>Fill in your details below</Text>
            </View>

            <View style={styles.formSection}>
              <FormRow
                label="Full Name"
                value={name}
                onChangeText={setName}
                placeholder="Enter your full name"
                variant="light"
              />
              <FormRow
                label="Email Address"
                value={email}
                onChangeText={setEmail}
                placeholder="yourname@example.com"
                variant="light"
              />
              <FormRow
                label="Phone Number"
                value={phone}
                onChangeText={setPhone}
                placeholder="+91 98765 43210"
                variant="light"
              />
              <FormRow
                label="Password"
                value={password}
                onChangeText={setPassword}
                placeholder="Create a strong password"
                secureTextEntry
                variant="light"
              />
              <FormRow
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Re-enter your password"
                secureTextEntry
                variant="light"
              />

              <View style={styles.termsSection}>
                <Ionicons
                  name="information-circle"
                  size={14}
                  color={colors.muted}
                />
                <Text style={styles.termsText}>
                  By registering, you agree to our Terms & Conditions
                </Text>
              </View>

              <Pressable onPress={onRegister}>
                <LinearGradient
                  colors={["#f5576c", "#ff6a95"] as any}
                  style={styles.primaryBtn}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                >
                  <Ionicons name="checkmark-circle" size={20} color="white" />
                  <Text style={styles.primaryBtnText}>Create Account</Text>
                </LinearGradient>
              </Pressable>

              <View style={styles.divider}>
                <View style={styles.dividerLine} />
              </View>

              <Pressable
                style={styles.signInLink}
                onPress={() => navigation.navigate("Login")}
              >
                <Text style={styles.signInLinkText}>
                  Already have an account?{" "}
                  <Text style={styles.signInLinkBold}>Sign In</Text>
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>Powered by Swaraj Palace</Text>
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
    color: colors.muted,
    fontSize: 12,
    lineHeight: 16,
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
    shadowColor: "#f5576c",
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
  signInLink: {
    paddingVertical: 12,
    alignItems: "center",
  },
  signInLinkText: {
    color: "#333333",
    fontSize: 15,
    fontWeight: "500",
  },
  signInLinkBold: {
    fontWeight: "700",
    color: "#f5576c",
  },
  footer: {
    marginTop: 32,
    marginBottom: 20,
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
