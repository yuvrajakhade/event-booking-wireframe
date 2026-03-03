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
};

export default function FormRow({
  label,
  value,
  placeholder,
  onChangeText,
  secureTextEntry,
}: Props) {
  return (
    <View style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        value={value}
        placeholder={placeholder}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        placeholderTextColor={colors.muted}
      />
    </View>
  );
}
