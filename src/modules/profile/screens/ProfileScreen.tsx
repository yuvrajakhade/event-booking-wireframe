import React from "react";
import { View, Text, Pressable, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/ProfileScreen.styles";

type ProfileScreenProps = {
  onLogout: () => void;
};

export default function ProfileScreen({ onLogout }: ProfileScreenProps) {
  return (
    <View style={styles.gradient}>
      <View style={styles.container}>
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

          <Pressable style={styles.btn} onPress={onLogout}>
            <Ionicons name="log-out" size={18} color="white" />
            <Text style={styles.btnText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
