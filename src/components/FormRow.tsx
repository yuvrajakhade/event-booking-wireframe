import React from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "../theme/styles/FormRow.styles";
import { colors } from "../theme/colors";

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
  const placeholderColor = colors.placeholder;

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
