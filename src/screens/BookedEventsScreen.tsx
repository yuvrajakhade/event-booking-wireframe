import React, { useMemo, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  FlatList,
  Pressable,
  Text,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateRangeBar from "../components/DateRangeBar";
import ListCard from "../components/ListCard";
import BrandHeader from "../components/BrandHeader";
import { mockEvents } from "../data/mock";
import { colors } from "../theme/colors";
import { useNavigation } from "@react-navigation/native";

function isoDateOnly(iso: string) {
  return iso.slice(0, 10);
}

export default function BookedEventsScreen() {
  const nav = useNavigation<any>();
  const [from, setFrom] = useState("2026-03-01");
  const [to, setTo] = useState("2026-03-31");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return mockEvents.filter((e) => {
      const d = isoDateOnly(e.start);
      const inRange = d >= from && d <= to;
      const matches = (e.title + e.customerName + e.venue)
        .toLowerCase()
        .includes(q.toLowerCase());
      return inRange && matches;
    });
  }, [from, to, q]);

  return (
    <View style={styles.container}>
      <BrandHeader />
      <DateRangeBar
        from={from}
        to={to}
        onChangeFrom={setFrom}
        onChangeTo={setTo}
      />
      <View style={styles.searchWrap}>
        <Ionicons name="search" size={16} color={colors.muted} />
        <TextInput
          value={q}
          onChangeText={setQ}
          placeholder="Search event/customer/venue"
          style={styles.search}
        />
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => (
          <ListCard
            title={item.title}
            subtitle={`${isoDateOnly(item.start)} • ${item.venue} • ${item.customerName}`}
            metaLeft={`Status: ${item.status}`}
            metaRight={`Items: ${item.inventory.length}`}
            actions={[
              {
                label: "View/Edit",
                onPress: () =>
                  nav.navigate("EventForm", { mode: "edit", eventId: item.id }),
              },
              { label: "Check-In", onPress: () => nav.navigate("CheckIn") },
              { label: "Check-Out", onPress: () => nav.navigate("CheckOut") },
            ]}
          />
        )}
      />

      <Pressable
        style={styles.fab}
        onPress={() => nav.navigate("EventForm", { mode: "add" })}
      >
        <Ionicons name="add" size={16} color="white" />
        <Text style={styles.fabText}>Add</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  searchWrap: {
    paddingHorizontal: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  search: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: colors.bg,
    color: colors.text,
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 999,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  fabText: { color: "white", fontWeight: "700" },
});
