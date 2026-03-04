import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
      colors={colors.gradients.royal as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <AuthHeader />
          <View style={styles.card}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.sub}>Login to continue</Text>

            <FormRow
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="name@example.com"
            />
            <FormRow
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry
            />

            <Pressable style={[styles.btn, styles.primary]} onPress={onLogin}>
              <Ionicons name="log-in" size={16} color="white" />
              <Text style={[styles.btnText, { color: "white" }]}>Login</Text>
            </Pressable>

            <Pressable
              style={[styles.btn, styles.ghost]}
              onPress={() => navigation.navigate("Register")}
            >
              <Ionicons name="person-add" size={16} color={colors.primary} />
              <Text style={[styles.btnText, { color: colors.primary }]}>
                Create Account
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.text,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  sub: {
    color: colors.muted,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 15,
  },
  btn: {
    marginHorizontal: 12,
    marginTop: 12,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primary: {
    backgroundColor: colors.primary,
    borderColor: colors.primaryDark,
  },
  ghost: {
    backgroundColor: "white",
    borderColor: colors.primary,
  },
  btnText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
