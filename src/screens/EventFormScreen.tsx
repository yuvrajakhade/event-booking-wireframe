import React, { useMemo, useState } from "react";
import { View, ScrollView, StyleSheet, Text, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
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
    <LinearGradient
      colors={colors.gradients.purple as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <BrandHeader />
        <ScrollView>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionEmoji}>📝</Text>
            </View>
            <Text style={styles.section}>Basic Information</Text>
          </View>
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

          <View style={styles.sectionHeader}>
            <View style={styles.sectionIcon}>
              <Text style={styles.sectionEmoji}>📅</Text>
            </View>
            <Text style={styles.section}>Event Schedule</Text>
          </View>
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
          <Pressable style={[styles.btn, styles.btnCancel]} onPress={() => {}}>
            <Text style={[styles.btnText, styles.btnCancelText]}>✕ Cancel</Text>
          </Pressable>
          <LinearGradient
            colors={colors.gradients.primary as any}
            style={[styles.btn, styles.btnCreate]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Pressable style={styles.btnInner} onPress={() => {}}>
              <Text style={[styles.btnText, { color: "white" }]}>
                {mode === "edit" ? "💾 Save" : "✨ Create"}
              </Text>
            </Pressable>
          </LinearGradient>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: { flex: 1 },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingTop: 20,
    paddingBottom: 8,
    gap: 12,
  },
  sectionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  sectionEmoji: {
    fontSize: 20,
  },
  section: {
    fontSize: 18,
    fontWeight: "800",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
  },
  footer: {
    flexDirection: "row",
    gap: 12,
    padding: 12,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
    borderTopWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 10,
  },
  btn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  btnCancel: {
    backgroundColor: "rgba(255, 59, 48, 0.75)",
    borderRadius: 12,
  },
  btnCreate: {
    borderWidth: 0,
  },
  btnInner: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  btnCancelText: {
    color: "white",
  },
  btnText: {
    fontWeight: "700",
    fontSize: 14,
  },
});
