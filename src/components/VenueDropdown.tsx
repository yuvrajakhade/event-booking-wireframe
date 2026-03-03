import React, { useState } from "react";
import { View, Text, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/VenueDropdown.styles";

interface Props {
  label: string;
  value: string;
  onSelect: (value: string) => void;
}

const VENUE_OPTIONS = ["Phase 1", "Phase 2"];

export default function VenueDropdown({ label, value, onSelect }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (option: string) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.input, isOpen && styles.inputActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text style={[styles.inputText, !value && styles.placeholder]}>
          {value || "Select venue..."}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color={colors.text}
        />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {VENUE_OPTIONS.map((option) => (
            <Pressable
              key={option}
              style={[styles.option, value === option && styles.optionActive]}
              onPress={() => handleSelect(option)}
            >
              <Text
                style={[
                  styles.optionText,
                  value === option && styles.optionTextActive,
                ]}
              >
                {option}
              </Text>
              {value === option && (
                <Ionicons name="checkmark" size={18} color={colors.primary} />
              )}
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
}
