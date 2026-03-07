import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "../../../components/AuthHeader";
import FormRow from "../../../components/FormRow";
import { styles } from "../styles/LoginScreen.styles";

type LoginScreenProps = {
  onLogin: () => void;
};

export default function LoginScreen({ onLogin }: LoginScreenProps) {
  const navigation = useNavigation<any>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.gradient}>
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

              <Pressable onPress={onLogin} style={styles.primaryBtn}>
                <Ionicons name="log-in" size={20} color="white" />
                <Text style={styles.primaryBtnText}>Sign In</Text>
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
    </View>
  );
}
