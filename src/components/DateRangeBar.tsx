import React from "react";
import { View, Text, TextInput, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
          <Ionicons name="calendar" size={14} color={colors.muted} />
          <TextInput
            value={from}
            onChangeText={onChangeFrom}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
        </View>
      </View>
      <View style={styles.col}>
        <Text style={styles.label}>To</Text>
        <View style={styles.inputWrap}>
          <Ionicons name="calendar-clear" size={14} color={colors.muted} />
          <TextInput
            value={to}
            onChangeText={onChangeTo}
            placeholder="YYYY-MM-DD"
            style={styles.input}
          />
        </View>
      </View>
      <Pressable style={styles.btn} onPress={onApply}>
        <Ionicons name="filter" size={14} color="white" />
        <Text style={styles.btnText}>Apply</Text>
      </Pressable>
    </View>
  );
}
