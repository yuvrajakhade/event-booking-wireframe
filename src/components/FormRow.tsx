import React from "react";
import { View, Text, TextInput } from "react-native";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/FormRow.styles";

type Props = {
  label: string;
  value: string;
  placeholder?: string;
  onChangeText?: (v: string) => void;
  secureTextEntry?: boolean;
  variant?: "dark" | "light";
};

export default function FormRow({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
  variant = "dark",
}: Props) {
  const isLight = variant === "light";
  const labelStyle = isLight ? styles.labelLight : styles.label;
  const inputStyle = isLight ? styles.inputLight : styles.input;
  const placeholderColor = isLight
    ? "rgba(51, 51, 51, 0.5)"
    : "rgba(255, 255, 255, 0.6)";

  return (
    <View style={styles.row}>
      <Text style={labelStyle}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={inputStyle}
        placeholderTextColor={placeholderColor}
      />
    </View>
  );
}
