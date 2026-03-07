import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { StyleSheet } from "react-native";

export default function AuthHeader() {
  const styles = StyleSheet.create({
    container: {
      marginHorizontal: 4,
      marginTop: 4,
      marginBottom: 8,
      alignItems: "center",
    },
    logoContainer: {
      position: "relative",
      marginBottom: 12,
    },
    logoGlow: {
      position: "absolute",
      top: -8,
      left: -8,
      right: -8,
      bottom: -8,
      borderRadius: 48,
      backgroundColor: "rgba(255, 255, 255, 0.3)",
      opacity: 0.6,
    },
    logoWrap: {
      width: 80,
      height: 80,
      borderRadius: 40,
      borderWidth: 4,
      borderColor: "rgba(255, 255, 255, 0.9)",
      backgroundColor: "white",
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 8 },
      shadowOpacity: 0.3,
      shadowRadius: 16,
      elevation: 10,
    },
    iconGradient: {
      width: 72,
      height: 72,
      borderRadius: 36,
      backgroundColor: colors.button,
      alignItems: "center",
      justifyContent: "center",
    },
    name: {
      fontSize: 28,
      fontWeight: "900",
      color: colors.title,
      letterSpacing: 1,
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 0, height: 2 },
      textShadowRadius: 4,
    },
    subtitle: {
      fontSize: 13,
      fontWeight: "600",
      color: colors.subtitle,
      marginTop: 4,
      letterSpacing: 2,
      textTransform: "uppercase",
      textShadowColor: "rgba(0, 0, 0, 0.2)",
      textShadowOffset: { width: 0, height: 1 },
      textShadowRadius: 2,
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <View style={styles.logoGlow} />
        <View style={styles.logoWrap}>
          <View style={styles.iconGradient}>
            <Ionicons name="business" size={36} color="white" />
          </View>
        </View>
      </View>
      <Text style={styles.name}>SWOJUS PALACE</Text>
      <Text style={styles.subtitle}>Event Management</Text>
    </View>
  );
}
