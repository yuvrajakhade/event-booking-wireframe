import React, { useMemo, useState } from "react";
import { View, Text, FlatList, TextInput } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../../../types";
import { colors } from "../../../theme/colors";
import { mockEvents } from "../../../data/mock";
import { styles } from "../styles/MissingInventoryScreen.styles";

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
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <View style={[styles.blurContainer, { backgroundColor: colors.bg }]}>
        <View style={styles.container}>
          <View
            style={[styles.headerCard, { backgroundColor: colors.bgLight }]}
          >
            <View
              style={[styles.headerIcon, { backgroundColor: colors.danger }]}
            >
              <Ionicons name="alert-circle" size={24} color="white" />
            </View>
            <Text style={[styles.title, { color: colors.title }]}>
              Missing Inventory
            </Text>
            <Text style={[styles.subtitle, { color: colors.subtitle }]}>
              {event.venue} • {event.start.slice(0, 10)}
            </Text>
          </View>
          <View style={styles.searchWrap}>
            <View
              style={[styles.searchBar, { backgroundColor: colors.bgLight }]}
            >
              <Ionicons name="search" size={20} color={colors.subtitle} />
              <TextInput
                value={searchQ}
                onChangeText={setSearchQ}
                placeholder="Search items..."
                style={styles.search}
                placeholderTextColor={colors.placeholder}
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
              <View style={[styles.row, { backgroundColor: colors.bgLight }]}>
                <View style={styles.rowHeader}>
                  <Text style={[styles.rowTitle, { color: colors.title }]}>
                    {item.name}
                  </Text>
                  <View
                    style={[styles.badge, { backgroundColor: colors.dangerBg }]}
                  >
                    <Text style={[styles.badgeText, { color: colors.danger }]}>
                      {item.missing}
                    </Text>
                  </View>
                </View>
                <Text style={[styles.rowMeta, { color: colors.textLight }]}>
                  Missing: {item.missing} {item.unit}
                </Text>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyListContainer}>
                <Text
                  style={[styles.emptyListText, { color: colors.textLight }]}
                >
                  No missing inventory for this event.
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </View>
  );
}
