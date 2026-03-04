import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={colors.gradients.green as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
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
                  <Ionicons
                    name="add-circle"
                    size={28}
                    color={colors.success}
                  />
                </Pressable>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.footer}>
          <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.btn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable style={styles.btnInner}>
              <Ionicons name="checkmark-done" size={18} color="white" />
              <Text style={styles.btnText}>Complete Check-In</Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: { flex: 1 },
  minimalHeader: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
    borderBottomWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
  },
  minimalTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "white",
  },
  header: {
    padding: 12,
    borderBottomWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
  },
  title: {
    fontSize: 16,
    fontWeight: "800",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  scrollView: { flex: 1 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    margin: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
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
    fontSize: 22,
    fontWeight: "800",
    color: colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  footer: {
    padding: 12,
    borderTopWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.5)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  btn: {
    borderRadius: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  btnInner: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 16,
  },
  btnText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
});
