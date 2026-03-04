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
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={colors.gradients.ocean as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <BrandHeader />
        <DateRangeBar
          from={from}
          to={to}
          onChangeFrom={setFrom}
          onChangeTo={setTo}
        />
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color="#0066CC" />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search event/customer/venue"
              style={styles.search}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ListCard
              title={item.title}
              subtitle={`${isoDateOnly(item.start)} • ${item.venue} • ${item.customerName}`}
              metaLeft={`Status: ${item.status}`}
              metaLeftIcon="checkmark-circle"
              metaRight={`Rooms: ${item.rooms.length}`}
              metaRightIcon="home"
              actions={[
                {
                  label: "View/Edit",
                  onPress: () =>
                    nav.navigate("EventForm", {
                      mode: "edit",
                      eventId: item.id,
                    }),
                },
                { label: "Check-In", onPress: () => nav.navigate("CheckIn") },
                { label: "Check-Out", onPress: () => nav.navigate("CheckOut") },
              ]}
            />
          )}
        />

        <LinearGradient
          colors={[colors.secondary, colors.secondaryDark] as any}
          style={styles.fab}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Pressable
            style={styles.fabInner}
            onPress={() => nav.navigate("EventForm", { mode: "add" })}
          >
            <Ionicons name="add" size={20} color="white" />
            <Text style={styles.fabText}>Add</Text>
          </Pressable>
        </LinearGradient>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
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
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    borderRadius: 999,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  fabInner: {
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  fabText: { color: "white", fontWeight: "800", fontSize: 16 },
});
