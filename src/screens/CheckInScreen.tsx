import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import BrandHeader from "../components/BrandHeader";
import { colors } from "../theme/colors";
import { mockEvents } from "../data/mock";

interface InventoryCount {
  bedsheet: number;
  extraBed: number;
  runner: number;
  pillows: number;
  cushion: number;
  duvets: number;
  towels: number;
  napkins: number;
}

export default function CheckInScreen() {
  const event = mockEvents[0];

  const [counts, setCounts] = useState<InventoryCount>({
    bedsheet: 0,
    extraBed: 0,
    runner: 0,
    pillows: 0,
    cushion: 0,
    duvets: 0,
    towels: 0,
    napkins: 0,
  });

  const handleIncrement = (field: keyof InventoryCount) => {
    setCounts((prev) => ({ ...prev, [field]: prev[field] + 1 }));
  };

  const handleDecrement = (field: keyof InventoryCount) => {
    setCounts((prev) => ({
      ...prev,
      [field]: Math.max(0, prev[field] - 1),
    }));
  };

  const inventoryItems: {
    key: keyof InventoryCount;
    label: string;
    icon: keyof typeof Ionicons.glyphMap;
  }[] = [
    { key: "bedsheet", label: "Bedsheet", icon: "bed" },
    { key: "extraBed", label: "Extra Bed", icon: "bed" },
    { key: "runner", label: "Runner", icon: "square" },
    { key: "pillows", label: "Pillows", icon: "square" },
    { key: "cushion", label: "Cushion", icon: "square" },
    { key: "duvets", label: "Duvets", icon: "square" },
    { key: "towels", label: "Towels", icon: "shirt" },
    { key: "napkins", label: "Napkins", icon: "restaurant" },
  ];

  return (
    <View style={styles.container}>
      <BrandHeader />
      <View style={styles.header}>
        <Text style={styles.title}>
          {event.venue} • {event.start.slice(0, 10)}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {inventoryItems.map((item) => (
          <View key={item.key} style={styles.row}>
            <View style={styles.rowLeft}>
              <Ionicons name={item.icon} size={20} color={colors.primary} />
              <Text style={styles.rowLabel}>{item.label}</Text>
            </View>
            <View style={styles.counter}>
              <Pressable
                style={styles.counterBtn}
                onPress={() => handleDecrement(item.key)}
              >
                <Ionicons
                  name="remove-circle"
                  size={28}
                  color={colors.danger}
                />
              </Pressable>
              <Text style={styles.counterValue}>{counts[item.key]}</Text>
              <Pressable
                style={styles.counterBtn}
                onPress={() => handleIncrement(item.key)}
              >
                <Ionicons name="add-circle" size={28} color={colors.success} />
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnPrimary]}>
          <Ionicons name="checkmark-done" size={18} color="white" />
          <Text style={styles.btnText}>Complete Check-In</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 12, borderBottomWidth: 1, borderColor: colors.border },
  title: { fontSize: 14, fontWeight: "800", color: colors.text },
  scrollView: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    flex: 1,
  },
  rowLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.text,
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
  },
  counterBtn: {
    padding: 4,
  },
  counterValue: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  footer: {
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 12,
  },
  btnPrimary: {
    backgroundColor: colors.primary,
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
