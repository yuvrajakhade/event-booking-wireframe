import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
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
  const [password, setPassword] = useState("");

  return (
    <LinearGradient
      colors={colors.gradients.purple as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={styles.container}>
        <AuthHeader />
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.sub}>Register before entering app</Text>

          <FormRow
            label="Name"
            value={name}
            onChangeText={setName}
            placeholder="Your name"
          />
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

          <Pressable style={[styles.btn, styles.primary]} onPress={onRegister}>
            <Ionicons name="checkmark-circle" size={16} color="white" />
            <Text style={[styles.btnText, { color: "white" }]}>Register</Text>
          </Pressable>

          <Pressable
            style={[styles.btn, styles.ghost]}
            onPress={() => navigation.navigate("Login")}
          >
            <Ionicons name="arrow-back" size={16} color={colors.secondary} />
            <Text style={[styles.btnText, { color: colors.secondary }]}>
              Back to Login
            </Text>
          </Pressable>
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
    paddingTop: 40,
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
    shadowColor: colors.secondary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  primary: {
    backgroundColor: colors.secondary,
    borderColor: colors.secondaryDark,
  },
  ghost: {
    backgroundColor: "white",
    borderColor: colors.secondary,
  },
  btnText: {
    fontWeight: "700",
    fontSize: 15,
  },
});
