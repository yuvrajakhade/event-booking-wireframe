import React from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/EventSourceSelector.styles";

interface Props {
  value: "enquiry" | "booking";
  onSelect: (value: "enquiry" | "booking") => void;
}

export default function EventSourceSelector({ value, onSelect }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Event Source *</Text>
      <View style={styles.toggleContainer}>
        <Pressable
          style={[styles.option, value === "enquiry" && styles.optionActive]}
          onPress={() => onSelect("enquiry")}
        >
          <Ionicons
            name="help-circle"
            size={20}
            color={value === "enquiry" ? "white" : colors.muted}
          />
          <Text
            style={[
              styles.optionText,
              value === "enquiry" && styles.optionTextActive,
            ]}
          >
            Enquiry
          </Text>
        </Pressable>

        <View style={styles.divider} />

        <Pressable
          style={[styles.option, value === "booking" && styles.optionActive]}
          onPress={() => onSelect("booking")}
        >
          <Ionicons
            name="checkmark-done-circle"
            size={20}
            color={value === "booking" ? "white" : colors.muted}
          />
          <Text
            style={[
              styles.optionText,
              value === "booking" && styles.optionTextActive,
            ]}
          >
            Confirmed Booking
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
