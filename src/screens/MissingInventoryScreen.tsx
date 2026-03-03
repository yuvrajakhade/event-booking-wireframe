import React, { useMemo } from "react";
import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { colors } from "../theme/colors";
import { mockEvents } from "../data/mock";
import BrandHeader from "../components/BrandHeader";

export default function MissingInventoryScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "MissingInventory">>();
  const event =
    mockEvents.find((e) => e.id === route.params.eventId) ?? mockEvents[0];

  const missingRows = useMemo(() => {
    return event.inventory
      .map((it) => {
        const missing = Math.max(0, it.issuedQty - it.returnedQty);
        const amount = (it.rate ?? 0) * missing;
        return { ...it, missing, amount };
      })
      .filter((r) => r.missing > 0);
  }, [event.inventory]);

  return (
    <View style={styles.container}>
      <BrandHeader />
      <View style={styles.header}>
        <Text style={styles.title}>Missing inventory items</Text>
      </View>

      <FlatList
        data={missingRows}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View style={styles.rowHeader}>
              <Text style={styles.rowTitle}>{item.name}</Text>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.missing}</Text>
              </View>
            </View>
            <Text style={styles.rowMeta}>
              Missing: {item.missing} {item.unit}
            </Text>
          </View>
        )}
        ListEmptyComponent={
          <View style={{ padding: 12 }}>
            <Text style={{ color: colors.muted }}>
              No missing inventory for this event.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { padding: 12, borderBottomWidth: 1, borderColor: colors.border },
  title: { fontSize: 14, fontWeight: "800", color: colors.text },
  row: {
    margin: 12,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  rowTitle: { fontWeight: "800", color: colors.text, flex: 1 },
  badge: {
    backgroundColor: colors.danger,
    borderRadius: 16,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: { color: "white", fontWeight: "800", fontSize: 12 },
  rowMeta: { marginTop: 4, color: colors.muted },
  actionRow: { flexDirection: "row", gap: 8, marginTop: 10 },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  actionText: { fontSize: 12, fontWeight: "600", color: colors.text },
});
