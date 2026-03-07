import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import FormRow from "../../../components/FormRow";
import { styles } from "../styles/RegisterScreen.styles";

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
                style={[
                  styles.iconCircle,
                  { backgroundColor: colors.secondary },
                ]}
              >
                <Ionicons name="person-add" size={40} color="white" />
              </View>
            </View>
            <Text style={[styles.heroTitle, { color: colors.title }]}>
              Create Account
            </Text>
            <Text style={[styles.heroSubtitle, { color: colors.subtitle }]}>
              Join us to start managing events
            </Text>
          </View>

          {/* Glass Morphism Card */}
          <View style={[styles.card, { backgroundColor: colors.bgLight }]}>
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
                  name="shield-checkmark"
                  size={16}
                  color={colors.success}
                />
                <Text style={[styles.termsText, { color: colors.textLight }]}>
                  By registering, you agree to our Terms & Conditions
                </Text>
              </View>

              <Pressable
                style={[
                  styles.primaryBtn,
                  { backgroundColor: colors.secondary },
                ]}
                onPress={onRegister}
              >
                <Text style={styles.primaryBtnText}>Create Account</Text>
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
                style={styles.signInLink}
                onPress={() => navigation.navigate("Login")}
              >
                <Text
                  style={[styles.signInLinkText, { color: colors.textLight }]}
                >
                  Already have an account?{" "}
                  <Text
                    style={[styles.signInLinkBold, { color: colors.secondary }]}
                  >
                    Sign In
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
