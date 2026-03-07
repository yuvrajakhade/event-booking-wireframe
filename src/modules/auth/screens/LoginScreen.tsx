import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  LinearGradient,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
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
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          {/* Modern Hero Section */}
          <View style={styles.heroSection}>
            <View style={styles.iconContainer}>
              <View
                style={[styles.iconCircle, { backgroundColor: colors.primary }]}
              >
                <Ionicons name="calendar" size={40} color="white" />
              </View>
            </View>
            <Text style={[styles.heroTitle, { color: colors.title }]}>
              Welcome Back
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.subtitle }]}>
              Sign in to manage your events
            </Text>
          </View>

          {/* Glass Morphism Card */}
          <View style={[styles.card, { backgroundColor: colors.bgLight }]}>
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
                <Text style={[styles.forgotText, { color: colors.primary }]}>
                  Forgot Password?
                </Text>
              </Pressable>

              <Pressable
                onPress={onLogin}
                style={[styles.primaryBtn, { backgroundColor: colors.primary }]}
              >
                <Text style={styles.primaryBtnText}>Sign In</Text>
                <Ionicons name="arrow-forward" size={20} color="white" />
              </Pressable>

              <View style={styles.divider}>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: colors.border },
                  ]}
                />
                <Text style={[styles.dividerText, { color: colors.textLight }]}>
                  or
                </Text>
                <View
                  style={[
                    styles.dividerLine,
                    { backgroundColor: colors.border },
                  ]}
                />
              </View>

              <Pressable
                style={styles.registerLink}
                onPress={() => navigation.navigate("Register")}
              >
                <Text
                  style={[styles.registerLinkText, { color: colors.textLight }]}
                >
                  Don't have an account?{" "}
                  <Text
                    style={[styles.registerLinkBold, { color: colors.primary }]}
                  >
                    Sign Up
                  </Text>
                </Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={[styles.footerText, { color: colors.muted }]}>
              Powered by SWOJUS PALACE
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
