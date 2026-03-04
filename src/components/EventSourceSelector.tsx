import React from "react";
import { View, Text, Pressable, Animated } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/EventSourceSelector.styles";

interface Props {
  value: "enquiry" | "booking";
  onSelect: (value: "enquiry" | "booking") => void;
}

export default function EventSourceSelector({ value, onSelect }: Props) {
  const togglePosition = value === "enquiry" ? 0 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Event Source *</Text>
        <Text style={styles.valueLabel}>
          {value === "enquiry" ? "📞 Enquiry" : "✅ Confirmed Booking"}
        </Text>
      </View>
      <Pressable
        style={styles.toggleSwitch}
        onPress={() => onSelect(value === "enquiry" ? "booking" : "enquiry")}
      >
        <Animated.View
          style={[
            styles.toggleThumb,
            {
              transform: [{ translateX: togglePosition === 0 ? 0 : 94 }],
            },
          ]}
        >
          <View style={[styles.thumbIcon, { backgroundColor: value === "enquiry" ? "#FF6B9D" : "#4CAF50" }]}>
            <Ionicons
              name={value === "enquiry" ? "help-circle" : "checkmark-done-circle"}
              size={18}
              color="white"
            />
          </View>
        </Animated.View>
        <View style={styles.toggleLabel}>
          <Text style={[styles.toggleText, togglePosition === 0 && styles.toggleTextActive]}>Enquiry</Text>
        </View>
        <View style={styles.toggleLabel}>
          <Text style={[styles.toggleText, togglePosition === 1 && styles.toggleTextActive]}>Booking</Text>
        </View>
      </Pressable>
    </View>
  );
}
