import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/BrandHeader.styles";

export default function BrandHeader() {
  return (
    <LinearGradient
      colors={colors.gradients.vibrant as any}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <View style={styles.logoWrap}>
        <Ionicons name="business" size={28} color="white" />
      </View>
      <Text style={styles.name}>Swaraj Palace</Text>
    </LinearGradient>
  );
}
