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
                  <Ionicons name={item.icon} size={20} color={colors.primary} />
                  <Text style={styles.rowLabel}>{item.label}</Text>
                </View>
                <View style={styles.expectedBadge}>
                  <Text style={styles.expectedText}>Expected: {expected}</Text>
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
                    <Text style={[styles.statusText, { color: colors.danger }]}>
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
        <Pressable
          style={[styles.btn, styles.btnPrimary]}
          onPress={handleSubmit}
        >
          <Ionicons name="checkmark-done" size={18} color="white" />
          <Text style={styles.btnText}>Complete Check-Out</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 12, borderBottomWidth: 1, borderColor: colors.border },
  title: { fontSize: 14, fontWeight: "800", color: colors.text },
  subtitle: { fontSize: 12, color: colors.muted, marginTop: 4 },
  scrollView: { flex: 1 },
  row: {
    margin: 12,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    gap: 12,
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
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "rgba(37, 99, 235, 0.1)",
  },
  expectedText: {
    fontSize: 12,
    fontWeight: "600",
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
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
    minWidth: 40,
    textAlign: "center",
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: "rgba(220, 38, 38, 0.1)",
  },
  statusText: {
    fontSize: 12,
    fontWeight: "700",
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
