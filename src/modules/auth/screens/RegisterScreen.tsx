import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import AuthHeader from "../../../components/AuthHeader";
import FormRow from "../../../components/FormRow";
import { colors } from "../../../theme/colors";
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

              <Pressable style={styles.primaryBtn} onPress={onRegister}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text style={styles.primaryBtnText}>Create Account</Text>
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
            <Text style={styles.footerText}>Powered by SWOJUS PALACE</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
