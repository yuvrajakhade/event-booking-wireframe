import React, { useState } from "react";
import { View, Text, ScrollView, Pressable, Alert } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../../theme/colors";
import { mockEvents } from "../../../data/mock";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/CheckOutScreen.styles";

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

export default function CheckOutScreen() {
  const nav = useNavigation<any>();
  const event = mockEvents[0];

  // Expected quantities (what was issued during check-in)
  const expectedCounts: InventoryCount = {
    bedsheet: 10,
    extraBed: 5,
    runner: 8,
    pillows: 20,
    cushion: 15,
    duvets: 10,
    towels: 30,
    napkins: 50,
  };

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

  const handleSubmit = () => {
    // Calculate missing items
    const missingItems: Array<{ key: string; label: string; missing: number }> =
      [];
    const keys = Object.keys(expectedCounts) as Array<keyof InventoryCount>;

    keys.forEach((key) => {
      const expected = expectedCounts[key];
      const returned = counts[key];
      const missing = expected - returned;

      if (missing > 0) {
        const item = inventoryItems.find((i) => i.key === key);
        if (item) {
          missingItems.push({
            key,
            label: item.label,
            missing,
          });
        }
      }
    });

    if (missingItems.length > 0) {
      // Navigate to missing inventory screen
      nav.navigate("MissingInventory", { eventId: event.id });
    } else {
      // All items returned successfully
      Alert.alert(
        "Check-Out Complete",
        "All items have been returned successfully!",
        [{ text: "OK" }],
      );
    }
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
    <View style={styles.gradient}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>
            {event.venue} • {event.end.slice(0, 10)}
          </Text>
          <Text style={styles.subtitle}>Count returned items</Text>
        </View>

        <ScrollView style={styles.scrollView}>
          {inventoryItems.map((item) => {
            const expected = expectedCounts[item.key];
            const returned = counts[item.key];
            const missing = expected - returned;
            const status =
              missing > 0
                ? "missing"
                : returned > expected
                  ? "excess"
                  : "complete";

            return (
              <View key={item.key} style={styles.row}>
                <View style={styles.rowTop}>
                  <View style={styles.rowLeft}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={colors.primary}
                    />
                    <Text style={styles.rowLabel}>{item.label}</Text>
                  </View>
                  <View style={styles.expectedBadge}>
                    <Text style={styles.expectedText}>
                      Expected: {expected}
                    </Text>
                  </View>
                </View>
                <View style={styles.counterRow}>
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
                  {status === "missing" && (
                    <View style={styles.statusBadge}>
                      <Ionicons
                        name="alert-circle"
                        size={14}
                        color={colors.danger}
                      />
                      <Text
                        style={[styles.statusText, { color: colors.danger }]}
                      >
                        -{missing}
                      </Text>
                    </View>
                  )}
                  {status === "complete" && returned > 0 && (
                    <View
                      style={[
                        styles.statusBadge,
                        { backgroundColor: "rgba(5, 150, 105, 0.1)" },
                      ]}
                    >
                      <Ionicons
                        name="checkmark-circle"
                        size={14}
                        color={colors.success}
                      />
                      <Text
                        style={[styles.statusText, { color: colors.success }]}
                      >
                        OK
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            );
          })}
        </ScrollView>

        <View style={styles.footer}>
          <Pressable style={styles.btn} onPress={handleSubmit}>
            <Ionicons name="checkmark-done" size={18} color="white" />
            <Text style={styles.btnText}>Complete Check-Out</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
