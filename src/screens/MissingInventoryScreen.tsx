import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
} from "react-native";
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
  const [searchQ, setSearchQ] = useState("");

  const missingRows = useMemo(() => {
    return event.inventory
      .map((it) => {
        const missing = Math.max(0, it.issuedQty - it.returnedQty);
        const amount = (it.rate ?? 0) * missing;
        return { ...it, missing, amount };
      })
      .filter((r) => r.missing > 0);
  }, [event.inventory]);

  const filteredRows = useMemo(() => {
    return missingRows.filter((item) =>
      item.name.toLowerCase().includes(searchQ.toLowerCase()),
    );
  }, [missingRows, searchQ]);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop&blur=50",
      }}
      style={styles.gradient}
      blurRadius={80}
    >
      <BlurView intensity={90} style={styles.blurContainer}>
        <View style={styles.container}>
          <BrandHeader />
          <View style={styles.searchWrap}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={16} color="#0066CC" />
              <TextInput
                value={searchQ}
                onChangeText={setSearchQ}
                placeholder="Search items..."
                style={styles.search}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={styles.header}>
            <Text style={styles.title}>Missing inventory items</Text>
          </View>

          <FlatList
            data={filteredRows}
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
      </BlurView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  blurContainer: {
    flex: 1,
  },
  container: { flex: 1 },
  searchWrap: {
    paddingHorizontal: 12,
    paddingVertical: 14,
    borderBottomWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderWidth: 0,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  search: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    fontWeight: "500",
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
  row: {
    margin: 12,
    padding: 14,
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
