import React from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BrandHeader from "../components/BrandHeader";
import { colors } from "../theme/colors";

type ProfileScreenProps = {
  onLogout: () => void;
};

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <View style={styles.container}>
      <BrandHeader />
      <View style={styles.card}>
        <View style={styles.headerRow}>
          <Image
            source={{ uri: "https://picsum.photos/120" }}
            style={styles.avatar}
          />
          <View>
            <Text style={styles.title}>Event Manager</Text>
            <Text style={styles.rolePill}>Admin</Text>
          </View>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="mail" size={16} color={colors.primary} />
          <Text style={styles.rowValue}>manager@example.com</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="call" size={16} color={colors.primary} />
          <Text style={styles.rowValue}>+91 99999 99999</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="business" size={16} color={colors.primary} />
          <Text style={styles.rowValue}>Event Operations</Text>
        </View>

        <Pressable style={styles.btn} onPress={onLogout}>
          <Ionicons name="log-out" size={16} color="white" />
          <Text style={styles.btnText}>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: 12 },
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 14,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 1,
    borderColor: colors.border,
  },
  title: { fontSize: 22, fontWeight: "800", color: colors.text },
  rolePill: {
    marginTop: 4,
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    color: colors.muted,
  },
  infoRow: { flexDirection: "row", alignItems: "center", gap: 8 },
  rowValue: { fontSize: 16, color: colors.text },
  btn: {
    marginTop: 12,
    borderWidth: 1,
    borderColor: colors.danger,
    backgroundColor: colors.danger,
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 6,
  },
  btnText: { color: "white", fontWeight: "800" },
});
