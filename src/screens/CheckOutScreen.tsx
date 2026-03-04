import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import BrandHeader from "../components/BrandHeader";
import { colors } from "../theme/colors";
import { mockEvents } from "../data/mock";
import { useNavigation } from "@react-navigation/native";

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
    <LinearGradient
      colors={colors.gradients.ocean as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <BrandHeader />
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
          <LinearGradient
            colors={colors.gradients.primary as any}
            style={styles.btn}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable style={styles.btnInner} onPress={handleSubmit}>
              <Ionicons name="checkmark-done" size={18} color="white" />
              <Text style={styles.btnText}>Complete Check-Out</Text>
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
  subtitle: {
    fontSize: 13,
    color: "rgba(255, 255, 255, 0.9)",
    marginTop: 4,
    fontWeight: "600",
  },
  scrollView: { flex: 1 },
  row: {
    margin: 12,
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    gap: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  expectedBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(37, 99, 235, 0.15)",
  },
  expectedText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.primary,
  },
  counterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    backgroundColor: "rgba(220, 38, 38, 0.15)",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "800",
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
