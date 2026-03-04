import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";

type ProfileScreenProps = {
  onLogout: () => void;
};

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <LinearGradient
      colors={colors.gradients.nightfall as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.minimalHeader}>
          <Text style={styles.minimalTitle}>👤 Profile</Text>
        </View>
        <View style={styles.card}>
          <View style={styles.headerRow}>
            <View style={styles.avatarWrap}>
              <Image
                source={{ uri: "https://picsum.photos/120" }}
                style={styles.avatar}
              />
            </View>
            <View style={styles.userInfo}>
              <Text style={styles.title}>Event Manager</Text>
              <View style={styles.rolePill}>
                <Text style={styles.rolePillText}>Admin</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="mail" size={18} color="white" />
            </View>
            <Text style={styles.rowValue}>manager@example.com</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="call" size={18} color="white" />
            </View>
            <Text style={styles.rowValue}>+91 99999 99999</Text>
          </View>
          <View style={styles.infoRow}>
            <View style={styles.iconCircle}>
              <Ionicons name="business" size={18} color="white" />
            </View>
            <Text style={styles.rowValue}>Event Operations</Text>
          </View>

          <LinearGradient
            colors={[colors.danger, colors.dangerLight] as any}
            style={styles.btn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable style={styles.btnInner} onPress={onLogout}>
              <Ionicons name="log-out" size={18} color="white" />
              <Text style={styles.btnText}>Logout</Text>
            </Pressable>
          </LinearGradient>
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
    padding: 12,
  },
  minimalHeader: {
    marginHorizontal: -12,
    marginTop: -12,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  minimalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderRadius: 24,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 12,
  },
  avatarWrap: {
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 4,
    borderColor: "white",
  },
  userInfo: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 8,
  },
  rolePill: {
    alignSelf: "flex-start",
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  rolePillText: {
    color: "white",
    fontWeight: "700",
    fontSize: 13,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    paddingVertical: 4,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.accent,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 3,
  },
  rowValue: {
    fontSize: 16,
    color: colors.text,
    fontWeight: "600",
    flex: 1,
  },
  btn: {
    marginTop: 16,
    borderRadius: 16,
    overflow: "hidden",
    shadowColor: colors.danger,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 6,
  },
  btnInner: {
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8,
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
