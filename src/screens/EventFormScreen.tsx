import React, { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { RootStackParamList } from "../types";
import { colors } from "../theme/colors";
import FormRow from "../components/FormRow";
import VenueDropdown from "../components/VenueDropdown";
import RoomSelector from "../components/RoomSelector";
import EventSourceSelector from "../components/EventSourceSelector";
import BrandHeader from "../components/BrandHeader";
import { mockEvents } from "../data/mock";

export default function EventFormScreen() {
  const route = useRoute<RouteProp<RootStackParamList, "EventForm">>();
  const mode = route.params?.mode ?? "add";
  const eventId = route.params?.eventId;

  const existing = useMemo(
    () => (eventId ? mockEvents.find((e) => e.id === eventId) : undefined),
    [eventId],
  );

  const [title, setTitle] = useState(existing?.title ?? "");
  const [customerName, setCustomerName] = useState(
    existing?.customerName ?? "",
  );
  const [phone, setPhone] = useState(existing?.phone ?? "");
  const [eventSource, setEventSource] = useState<"enquiry" | "booking">(
    "booking",
  );
  const [venue, setVenue] = useState(existing?.venue ?? "");
  const [selectedRooms, setSelectedRooms] = useState<string[]>([]);
  const [startDate, setStartDate] = useState(
    (existing?.start ?? "2026-03-03").slice(0, 10),
  );
  const [startTime, setStartTime] = useState("10:00");
  const [endDate, setEndDate] = useState(
    (existing?.end ?? "2026-03-03").slice(0, 10),
  );
  const [endTime, setEndTime] = useState("14:00");

  return (
    <View style={styles.container}>
      <BrandHeader />
      <ScrollView>
        <Text style={styles.section}>Basic</Text>
        <FormRow
          label="Title *"
          value={title}
          onChangeText={setTitle}
          placeholder="Event title"
        />
        <FormRow
          label="Customer *"
          value={customerName}
          onChangeText={setCustomerName}
          placeholder="Customer name"
        />
        <FormRow
          label="Phone"
          value={phone}
          onChangeText={setPhone}
          placeholder="+91..."
        />
        <VenueDropdown label="Venue *" value={venue} onSelect={setVenue} />
        <RoomSelector
          label="Select Rooms"
          selectedRooms={selectedRooms}
          onSelect={setSelectedRooms}
        />
        <EventSourceSelector value={eventSource} onSelect={setEventSource} />

        <Text style={styles.section}>Schedule</Text>
        <FormRow
          label="Start Date (YYYY-MM-DD)"
          value={startDate}
          onChangeText={setStartDate}
        />
        <FormRow
          label="Start Time (HH:MM)"
          value={startTime}
          onChangeText={setStartTime}
        />
        <FormRow
          label="End Date (YYYY-MM-DD)"
          value={endDate}
          onChangeText={setEndDate}
        />
        <FormRow
          label="End Time (HH:MM)"
          value={endTime}
          onChangeText={setEndTime}
        />

        <View style={{ height: 24 }} />
      </ScrollView>

      <View style={styles.footer}>
        <Pressable style={[styles.btn, styles.btnGhost]} onPress={() => {}}>
          <Text style={[styles.btnText, { color: colors.text }]}>Cancel</Text>
        </Pressable>
        <Pressable style={[styles.btn, styles.btnPrimary]} onPress={() => {}}>
          <Text style={[styles.btnText, { color: "white" }]}>
            {mode === "edit" ? "Save" : "Create"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  section: {
    paddingHorizontal: 12,
    paddingTop: 18,
    fontWeight: "800",
    color: colors.text,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    borderTopWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bg,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  btnGhost: { borderColor: colors.border, backgroundColor: colors.bg },
  btnPrimary: { borderColor: colors.primary, backgroundColor: colors.primary },
  btnText: { fontWeight: "800" },
});
