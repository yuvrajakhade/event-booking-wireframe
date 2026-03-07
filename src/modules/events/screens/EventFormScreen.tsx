import React, { useMemo, useState } from "react";
import { View, ScrollView, Text, Pressable } from "react-native";
import { RouteProp, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { RootStackParamList } from "../../../types";
import { colors } from "../../../theme/colors";
import FormRow from "../../../components/FormRow";
import VenueDropdown from "../../../components/VenueDropdown";
import RoomSelector from "../../../components/RoomSelector";
import EventSourceSelector from "../../../components/EventSourceSelector";
import EventTypeDropdown from "../../../components/EventTypeDropdown";
import { mockEvents } from "../../../data/mock";
import { styles } from "../styles/EventFormScreen.styles";

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
  const [alternativeNumber, setAlternativeNumber] = useState("");
  const [eventType, setEventType] = useState("");
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
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <View style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Modern Section Header */}
          <View
            style={[styles.sectionHeader, { backgroundColor: colors.bgLight }]}
          >
            <View
              style={[styles.sectionIcon, { backgroundColor: colors.primary }]}
            >
              <Ionicons name="document-text" size={20} color="white" />
            </View>
            <Text style={[styles.section, { color: colors.title }]}>
              Basic Information
            </Text>
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
          <FormRow
            label="Alternative Number"
            value={alternativeNumber}
            onChangeText={setAlternativeNumber}
            placeholder="+91..."
          />
          <EventTypeDropdown
            label="Event Type *"
            value={eventType}
            onSelect={setEventType}
          />
          <VenueDropdown label="Venue *" value={venue} onSelect={setVenue} />
          <RoomSelector
            label="Select Rooms"
            selectedRooms={selectedRooms}
            onSelect={setSelectedRooms}
          />
          <EventSourceSelector value={eventSource} onSelect={setEventSource} />

          {/* Modern Section Header */}
          <View
            style={[styles.sectionHeader, { backgroundColor: colors.bgLight }]}
          >
            <View
              style={[styles.sectionIcon, { backgroundColor: colors.accent }]}
            >
              <Ionicons name="calendar" size={20} color="white" />
            </View>
            <Text style={[styles.section, { color: colors.title }]}>
              Event Schedule
            </Text>
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

          <View style={styles.spacer} />
        </ScrollView>

        {/* Modern Footer Actions */}
        <View style={styles.footer}>
          <Pressable
            style={[
              styles.btn,
              styles.btnCancel,
              { backgroundColor: colors.bgLight, borderColor: colors.border },
            ]}
            onPress={() => {}}
          >
            <Ionicons name="close" size={20} color={colors.danger} />
            <Text
              style={[
                styles.btnText,
                styles.btnCancelText,
                { color: colors.danger },
              ]}
            >
              Cancel
            </Text>
          </Pressable>
          <Pressable
            style={[
              styles.btn,
              styles.btnCreate,
              { backgroundColor: colors.primary },
            ]}
            onPress={() => {}}
          >
            <Ionicons
              name={mode === "edit" ? "checkmark-circle" : "add-circle"}
              size={20}
              color="white"
            />
            <Text style={[styles.btnText, styles.btnCreateText]}>
              {mode === "edit" ? "Save" : "Create"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
