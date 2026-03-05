import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/DateRangeBar.styles";

type Props = {
  from: string;
  to: string;
  onChangeFrom: (v: string) => void;
  onChangeTo: (v: string) => void;
  onApply?: () => void;
};

export default function DateRangeBar({
  from,
  to,
  onChangeFrom,
  onChangeTo,
  onApply,
}: Props) {
  return (
    <View style={styles.row}>
      <View style={styles.col}>
        <Text style={styles.label}>From</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="calendar" size={16} color={colors.primary} />
          <TextInput
            value={from}
            onChangeText={onChangeFrom}
            placeholder="YYYY-MM-DD"
            style={styles.input}
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>To</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="calendar-clear" size={16} color={colors.accent} />
          <TextInput
            value={to}
            onChangeText={onChangeTo}
            placeholder="YYYY-MM-DD"
            style={styles.input}
            placeholderTextColor={colors.muted}
          />
        </View>
      </View>
      <LinearGradient
        colors={colors.gradients.fire as any}
        style={styles.btn}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Pressable style={styles.btnInner} onPress={onApply}>
          <Ionicons name="filter" size={18} color="white" />
        </Pressable>
      </LinearGradient>
    </View>
  );
}
