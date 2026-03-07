import React, { useMemo, useState } from "react";
import { View, Text, FlatList, Pressable, TextInput } from "react-native";
// import { BlurView } from "expo-blur";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../../../theme/colors";
import { mockEvents } from "../../../data/mock";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/InventoryOverviewScreen.styles";

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
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <View style={styles.blurContainer}>
        <View style={styles.container}>
          <View
            style={[styles.headerCard, { backgroundColor: colors.bgLight }]}
          >
            <Text style={[styles.headerTitle, { color: colors.title }]}>
              Inventory Overview
            </Text>
            <View style={styles.statsGrid}>
              <View
                style={[styles.statCard, { backgroundColor: colors.dangerBg }]}
              >
                <Ionicons name="alert-circle" size={24} color={colors.danger} />
                <Text style={[styles.statValue, { color: colors.danger }]}>
                  {totalMissingAcrossAllEvents}
                </Text>
                <Text style={[styles.statLabel, { color: colors.danger }]}>
                  Missing Items
                </Text>
              </View>
              <View
                style={[styles.statCard, { backgroundColor: colors.warningBg }]}
              >
                <Ionicons name="cash" size={24} color={colors.warning} />
                <Text style={[styles.statValue, { color: colors.warning }]}>
                  ₹{totalAmountAcrossAllEvents}
                </Text>
                <Text style={[styles.statLabel, { color: colors.warning }]}>
                  Total Value
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.searchWrap}>
            <View
              style={[styles.searchBar, { backgroundColor: colors.bgLight }]}
            >
              <Ionicons name="search" size={20} color={colors.subtitle} />
              <TextInput
                value={searchQ}
                onChangeText={setSearchQ}
                placeholder="Search event/customer/venue"
                style={styles.search}
                placeholderTextColor={colors.placeholder}
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
    </View>
  );
}
