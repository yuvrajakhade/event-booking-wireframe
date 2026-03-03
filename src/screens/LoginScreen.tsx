import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import BrandHeader from "../components/BrandHeader";
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
    <View style={styles.container}>
      <View style={styles.content}>
        <BrandHeader />
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
            <Ionicons name="person-add" size={16} color={colors.text} />
            <Text style={[styles.btnText, { color: colors.text }]}>Create Account</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: 16,
  },
  content: {
    flex: 1,
    justifyContent: "flex-start",
    paddingTop: 24,
  },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    paddingHorizontal: 12,
  },
  sub: { color: colors.muted, paddingHorizontal: 12, marginBottom: 8 },
  btn: {
    marginHorizontal: 12,
    marginTop: 10,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  primary: { backgroundColor: colors.primary, borderColor: colors.primary },
  ghost: { backgroundColor: colors.bg, borderColor: colors.border },
  btnText: { fontWeight: "800" },
});
