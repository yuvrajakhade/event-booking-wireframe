import React, { useMemo, useState } from "react";
import { View, TextInput, FlatList, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateRangeBar from "../../../components/DateRangeBar";
import ListCard from "../../../components/ListCard";
import { mockEvents } from "../../../data/mock";
import { colors } from "../../../theme/colors";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../styles/BookedEventsScreen.styles";

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
      const isNotCompleted = e.status !== "Completed";
      const d = isoDateOnly(e.start);
      const inRange = d >= from && d <= to;
      const matches = (e.title + e.customerName + e.venue)
        .toLowerCase()
        .includes(q.toLowerCase());
      return isNotCompleted && inRange && matches;
    });
  }, [from, to, q]);

  return (
    <View style={styles.gradient}>
      <View style={styles.container}>
        <DateRangeBar
          from={from}
          to={to}
          onChangeFrom={setFrom}
          onChangeTo={setTo}
        />
        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={18} color={colors.subtitle} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search event/customer/venue"
              style={styles.search}
              placeholderTextColor={colors.placeholder}
            />
          </View>
        </View>

        <FlatList
          data={filtered}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <ListCard
              title={item.customerName}
              date={isoDateOnly(item.start)}
              mobile={item.phone ?? "-"}
              venue={item.venue}
              eventName={item.title}
              rooms={item.rooms.length}
              detailedFormat={true}
              actions={[
                {
                  label: "Edit",
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

        <Pressable
          style={styles.fab}
          onPress={() => nav.navigate("EventForm", { mode: "add" })}
        >
          <Ionicons name="add" size={28} color="white" />
        </Pressable>
      </View>
    </View>
  );
}
