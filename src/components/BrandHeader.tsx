import React from "react";
import { View, Text } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/BrandHeader.styles";

export default function BrandHeader() {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrap}>
        <Ionicons name="business" size={24} color={colors.primary} />
      </View>
      <Text style={styles.name}>Swaraj Palace</Text>
    </View>
  );
}
