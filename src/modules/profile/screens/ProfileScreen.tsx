import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import { styles } from "../styles/ProfileScreen.styles";

type ProfileScreenProps = {
  onLogout: () => void;
};

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <View style={styles.container}>
        <View style={[styles.card, { backgroundColor: colors.bgLight }]}>
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <View
                style={[
                  styles.avatarCircle,
                  { backgroundColor: colors.primary },
                ]}
              >
                <Ionicons name="person" size={48} color="white" />
              </View>
            </View>
            <View style={styles.userInfo}>
              <Text style={[styles.title, { color: colors.title }]}>
                Event Manager
              </Text>
              <View
                style={[styles.rolePill, { backgroundColor: colors.primaryBg }]}
              >
                <Ionicons
                  name="shield-checkmark"
                  size={14}
                  color={colors.primary}
                />
                <Text style={[styles.rolePillText, { color: colors.primary }]}>
                  Admin
                </Text>
              </View>
            </View>
          </View>

          <View style={[styles.infoRow, { backgroundColor: colors.primaryBg }]}>
            <View
              style={[styles.iconCircle, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="mail" size={18} color="white" />
            </View>
            <Text style={[styles.rowValue, { color: colors.text }]}>
              manager@example.com
            </Text>
          </View>
          <View style={[styles.infoRow, { backgroundColor: colors.accentBg }]}>
            <View
              style={[styles.iconCircle, { backgroundColor: colors.accent }]}
            >
              <Ionicons name="call" size={18} color="white" />
            </View>
            <Text style={[styles.rowValue, { color: colors.text }]}>
              +91 99999 99999
            </Text>
          </View>
          <View
            style={[styles.infoRow, { backgroundColor: colors.secondaryBg }]}
          >
            <View
              style={[styles.iconCircle, { backgroundColor: colors.secondary }]}
            >
              <Ionicons name="business" size={18} color="white" />
            </View>
            <Text style={[styles.rowValue, { color: colors.text }]}>
              Event Operations
            </Text>
          </View>

          <Pressable
            style={[styles.btn, { backgroundColor: colors.danger }]}
            onPress={onLogout}
          >
            <Ionicons name="log-out" size={20} color="white" />
            <Text style={styles.btnText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
