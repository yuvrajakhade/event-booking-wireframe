import React from "react";
import { View, Text, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/ListCard.styles";

type Props = {
  title: string;
  subtitle?: string;
  metaLeft?: string;
  metaRight?: string;
  onPress?: () => void;
  actions?: { label: string; onPress: () => void }[];
};

export default function ListCard({
  title,
  subtitle,
  metaLeft,
  metaRight,
  onPress,
  actions,
}: Props) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.headerRow}>
        <View style={styles.titleWrap}>
          <Ionicons name="sparkles" size={14} color={colors.primary} />
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
      {!!subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
      <View style={styles.metaRow}>
        {!!metaLeft && <Text style={styles.meta}>{metaLeft}</Text>}
        {!!metaRight && <Text style={styles.meta}>{metaRight}</Text>}
      </View>
      {!!actions?.length && (
        <View style={styles.actions}>
          {actions.map((a) => (
            <Pressable
              key={a.label}
              onPress={a.onPress}
              style={styles.actionBtn}
            >
              <Text style={styles.actionText}>{a.label}</Text>
            </Pressable>
          ))}
        </View>
      )}
    </Pressable>
  );
}
