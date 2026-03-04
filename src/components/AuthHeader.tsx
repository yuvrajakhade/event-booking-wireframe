import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { StyleSheet } from "react-native";

export default function AuthHeader() {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 12,
      marginTop: 12,
      marginBottom: 14,
      paddingHorizontal: 12,
      paddingVertical: 18,
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 12,
      backgroundColor: colors.card,
      flexDirection: "column",
      alignItems: "center",
      gap: 10,
      justifyContent: "center",
    },
    logoWrap: {
      width: 64,
      height: 64,
      borderRadius: 32,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.bg,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: 24,
      fontWeight: "900",
      color: colors.text,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Ionicons name="business" size={28} color={colors.primary} />
      </View>
      <Text style={styles.name}>Swaraj Palace</Text>
    </View>
  );
}
