import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  ImageBackground,
} from "react-native";
// import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { mockEvents } from "../data/mock";
import { useNavigation } from "@react-navigation/native";

interface MissingInventorySummary {
  eventId: string;
  eventTitle: string;
  customerName: string;
  venue: string;
  eventDate: string;
  missingItems: Array<{
    id: string;
    name: string;
    missing: number;
    unit: string;
    amount: number;
  }>;
  totalMissingCount: number;
  totalAmount: number;
}

export default function InventoryOverviewScreen() {
  const nav = useNavigation<any>();
  const [searchQ, setSearchQ] = useState("");

  const missingInventorySummary = useMemo(() => {
    const summaries: MissingInventorySummary[] = [];

    mockEvents.forEach((event) => {
      const missingItems = event.inventory
        .map((it) => {
          const missing = Math.max(0, it.issuedQty - it.returnedQty);
          const amount = (it.rate ?? 0) * missing;
          return {
            id: it.id,
            name: it.name,
            missing,
            unit: it.unit,
            amount,
          };
        })
        .filter((item) => item.missing > 0);

      if (missingItems.length > 0) {
        const totalMissingCount = missingItems.reduce(
          (sum, item) => sum + item.missing,
          0,
        );
        const totalAmount = missingItems.reduce(
          (sum, item) => sum + item.amount,
          0,
        );

        summaries.push({
          eventId: event.id,
          eventTitle: event.title,
          customerName: event.customerName,
          venue: event.venue,
          eventDate: event.start.slice(0, 10),
          missingItems,
          totalMissingCount,
          totalAmount,
        });
      }
    });

    return summaries;
  }, []);

  const totalMissingAcrossAllEvents = useMemo(() => {
    return missingInventorySummary.reduce(
      (sum, event) => sum + event.totalMissingCount,
      0,
    );
  }, [missingInventorySummary]);

  const totalAmountAcrossAllEvents = useMemo(() => {
    return missingInventorySummary.reduce(
      (sum, event) => sum + event.totalAmount,
      0,
    );
  }, [missingInventorySummary]);

  const filteredSummary = useMemo(() => {
    return missingInventorySummary.filter((item) =>
      (item.eventTitle + item.customerName + item.venue)
        .toLowerCase()
        .includes(searchQ.toLowerCase()),
    );
  }, [missingInventorySummary, searchQ]);

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop&blur=50",
      }}
      style={styles.gradient}
      blurRadius={80}
    >
      <View
        style={[
          styles.blurContainer,
          { backgroundColor: "rgba(255,255,255,0.05)" },
        ]}
      >
        <View style={styles.container}>
          <View style={styles.minimalHeader}>
            <Text style={styles.minimalTitle}>📦 Inventory Overview</Text>
          </View>
          <View style={styles.searchWrap}>
            <View style={styles.searchBar}>
              <Ionicons name="search" size={18} color="#0066CC" />
              <TextInput
                value={searchQ}
                onChangeText={setSearchQ}
                placeholder="Search event/customer/venue"
                style={styles.search}
                placeholderTextColor="#999"
              />
            </View>
          </View>
          <View style={styles.summaryCard}>
            <View style={styles.summaryRow}>
              <View style={styles.summaryItem}>
                <Ionicons name="alert-circle" size={24} color={colors.danger} />
                <Text style={styles.summaryValue}>
                  {totalMissingAcrossAllEvents}
                </Text>
                <Text style={styles.summaryLabel}>Total Missing Items</Text>
              </View>
              <View style={styles.divider} />
              <View style={styles.summaryItem}>
                <Ionicons name="calendar" size={24} color={colors.primary} />
                <Text style={styles.summaryValue}>
                  {missingInventorySummary.length}
                </Text>
                <Text style={styles.summaryLabel}>Events</Text>
              </View>
            </View>
          </View>

          <FlatList
            data={filteredSummary}
            keyExtractor={(item) => item.eventId}
            renderItem={({ item }) => (
              <Pressable
                style={styles.eventCard}
                onPress={() =>
                  nav.navigate("MissingInventory", { eventId: item.eventId })
                }
              >
                <View style={styles.eventHeader}>
                  <View style={styles.eventLeft}>
                    <Text style={styles.eventTitle}>{item.eventTitle}</Text>
                    <Text style={styles.eventMeta}>
                      {item.customerName} • {item.venue}
                    </Text>
                    <Text style={styles.eventDate}>{item.eventDate}</Text>
                  </View>
                  <View style={styles.eventBadge}>
                    <Text style={styles.eventBadgeText}>
                      {item.totalMissingCount}
                    </Text>
                  </View>
                </View>

                <View style={styles.itemsList}>
                  {item.missingItems.slice(0, 3).map((missingItem) => (
                    <View key={missingItem.id} style={styles.itemRow}>
                      <Ionicons
                        name="remove-circle"
                        size={14}
                        color={colors.danger}
                      />
                      <Text style={styles.itemText}>
                        {missingItem.name}: {missingItem.missing}{" "}
                        {missingItem.unit}
                      </Text>
                    </View>
                  ))}
                  {item.missingItems.length > 3 && (
                    <Text style={styles.moreText}>
                      +{item.missingItems.length - 3} more items
                    </Text>
                  )}
                </View>

                <View style={styles.actionHint}>
                  <Ionicons
                    name="chevron-forward"
                    size={16}
                    color={colors.primary}
                  />
                  <Text style={styles.actionText}>View Details</Text>
                </View>
              </Pressable>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons
                  name="checkmark-done-circle"
                  size={64}
                  color={colors.success}
                />
                <Text style={styles.emptyText}>No Missing Inventory</Text>
                <Text style={styles.emptySubtext}>
                  All items have been returned successfully
                </Text>
              </View>
            }
          />
        </View>
      </View>
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
  summaryCard: {
    margin: 12,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 6,
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.text,
  },
  summaryLabel: {
    fontSize: 11,
    color: colors.muted,
    textAlign: "center",
  },
  divider: {
    width: 1,
    height: 50,
    backgroundColor: colors.border,
  },
  eventCard: {
    margin: 12,
    marginTop: 0,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255, 255, 255, 0.95)",
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.7)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
    gap: 12,
  },
  eventHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  eventLeft: {
    flex: 1,
    gap: 4,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
  },
  eventMeta: {
    fontSize: 13,
    color: colors.muted,
  },
  eventDate: {
    fontSize: 12,
    color: colors.muted,
  },
  eventBadge: {
    backgroundColor: colors.danger,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    minWidth: 40,
    alignItems: "center",
  },
  eventBadgeText: {
    color: "white",
    fontWeight: "800",
    fontSize: 14,
  },
  itemsList: {
    gap: 8,
    paddingTop: 8,
    borderTopWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  itemText: {
    flex: 1,
    fontSize: 13,
    color: colors.text,
    fontWeight: "500",
  },
  itemAmount: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.danger,
  },
  moreText: {
    fontSize: 12,
    color: colors.primary,
    fontStyle: "italic",
    marginTop: 4,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  totalLabel: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.text,
  },
  totalValue: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.danger,
  },
  actionHint: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 4,
    marginTop: 4,
  },
  actionText: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.primary,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginTop: 16,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  emptySubtext: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    marginTop: 8,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
});
