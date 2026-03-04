import React, { useState, ReactNode } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Ionicons from "@expo/vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/CompletedEventsScreen.styles";
import { mockEvents } from "../data/mock";
import ListCard from "../components/ListCard";
import DateRangeBar from "../components/DateRangeBar";

type SectionKey = "info" | "customer" | "schedule" | "inventory";
type Event = Record<string, any>;

export default function CompletedEventsScreen({
  navigation,
}: {
  navigation: NativeStackNavigationProp<any>;
}) {
  const [searchText, setSearchText] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedEvent, setEditedEvent] = useState<Event | null>(null);
  const [expandedSections, setExpandedSections] = useState<
    Record<SectionKey, boolean>
  >({
    info: true,
    customer: true,
    schedule: true,
    inventory: false,
  });

  const completedEvents = mockEvents.filter((e) => e.status === "Completed");

  const closeModal = () => {
    setSelectedEvent(null);
    setIsEditMode(false);
    setEditedEvent(null);
    setExpandedSections({
      info: true,
      customer: true,
      schedule: true,
      inventory: false,
    });
  };

  const handleEdit = () => {
    setEditedEvent({ ...selectedEvent });
    setIsEditMode(true);
  };

  const handleCancelEdit = () => {
    setIsEditMode(false);
    setEditedEvent(null);
  };

  const toggleSection = (section: SectionKey) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleSaveEdit = () => {
    Alert.alert("Success", "Event details updated successfully!");
    setSelectedEvent(editedEvent);
    setIsEditMode(false);
  };

  const handleDelete = () => {
    Alert.alert("Delete Event", "Are you sure you want to delete this event?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Delete",
        onPress: () => {
          Alert.alert("Deleted", "Event has been deleted successfully");
          closeModal();
        },
        style: "destructive",
      },
    ]);
  };

  const handleMarkAsArchived = () => {
    Alert.alert("Archive Event", "Move this event to archived?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Archive",
        onPress: () => {
          Alert.alert("Archived", "Event has been archived");
          closeModal();
        },
      },
    ]);
  };

  const handleShare = () => {
    Alert.alert("Share", "Event details shared successfully!");
  };

  const renderDetailField = (
    label: string,
    value: any,
    fieldKey: string | null = null,
  ) => (
    <View style={styles.detailRow}>
      <Text style={styles.label}>{label}</Text>
      {isEditMode && fieldKey && editedEvent ? (
        <TextInput
          style={styles.editInput}
          value={String(editedEvent[fieldKey] || "")}
          onChangeText={(text) =>
            setEditedEvent({ ...editedEvent, [fieldKey]: text })
          }
          placeholderTextColor={colors.muted}
        />
      ) : (
        <Text style={styles.value}>{value}</Text>
      )}
    </View>
  );

  const AccordionSection = ({
    title,
    section,
    children,
  }: {
    title: string;
    section: SectionKey;
    children: ReactNode;
  }) => (
    <View style={styles.accordionContainer}>
      <TouchableOpacity
        style={styles.accordionHeader}
        onPress={() => toggleSection(section)}
        activeOpacity={0.7}
      >
        <View style={styles.accordionHeaderLeft}>
          <Text style={styles.sectionTitle}>{title}</Text>
        </View>
        <Ionicons
          name={expandedSections[section] ? "chevron-up" : "chevron-down"}
          size={24}
          color={colors.text}
        />
      </TouchableOpacity>

      {expandedSections[section] && (
        <View style={styles.accordionContent}>{children}</View>
      )}
    </View>
  );

  return (
    <LinearGradient
      colors={colors.gradients.green as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.minimalHeader}>
          <Text style={styles.minimalTitle}>✅ Completed Events</Text>
        </View>

        <View style={styles.searchWrap}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#0066CC" />
            <TextInput
              value={searchText}
              onChangeText={setSearchText}
              placeholder="Search completed events..."
              style={styles.searchInput}
              placeholderTextColor="#999"
            />
          </View>
        </View>

        <DateRangeBar
          from={fromDate}
          to={toDate}
          onChangeFrom={setFromDate}
          onChangeTo={setToDate}
          onApply={() => {}}
        />

        <FlatList
          data={completedEvents}
          keyExtractor={(e) => e.id}
          renderItem={({ item }: { item: Event }) => (
            <ListCard
              title={item.title}
              subtitle={`${item.customerName} • ${item.venue}`}
              metaLeft={item.start.slice(0, 10)}
              metaLeftIcon="calendar"
              metaRight={item.status}
              metaRightIcon="checkmark-done"
              onPress={() => setSelectedEvent(item)}
            />
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Ionicons
                name="checkmark-done-circle"
                size={64}
                color={colors.muted}
              />
              <Text style={styles.emptyText}>No completed events yet</Text>
              <Text style={styles.emptySubtext}>
                Completed events will appear here
              </Text>
            </View>
          }
        />

        <Modal
          visible={selectedEvent !== null}
          animationType="slide"
          transparent={false}
          onRequestClose={closeModal}
        >
          <View style={styles.modalContainer}>
            {(isEditMode ? editedEvent : selectedEvent) && (
              <ScrollView style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectedEvent(null);
                      setIsEditMode(false);
                      setEditedEvent(null);
                    }}
                    activeOpacity={0.7}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  >
                    <Ionicons
                      name="chevron-back"
                      size={28}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                  <Text style={styles.modalTitle}>Event Details</Text>
                  <View style={{ width: 28 }} />
                </View>

                <AccordionSection title="📋 Event Information" section="info">
                  {renderDetailField(
                    "Event Name",
                    selectedEvent?.title,
                    "title",
                  )}
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={[styles.value, styles.statusBadge]}>
                      {selectedEvent?.status}
                    </Text>
                  </View>
                  {renderDetailField("Venue", selectedEvent?.venue, "venue")}
                </AccordionSection>

                <AccordionSection
                  title="👤 Customer Information"
                  section="customer"
                >
                  {renderDetailField(
                    "Customer Name",
                    selectedEvent?.customerName,
                    "customerName",
                  )}
                  {renderDetailField("Phone", selectedEvent?.phone, "phone")}
                </AccordionSection>

                <AccordionSection title="📅 Event Schedule" section="schedule">
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>Start Date & Time</Text>
                    <Text style={styles.value}>
                      {new Date(selectedEvent?.start).toLocaleString()}
                    </Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Text style={styles.label}>End Date & Time</Text>
                    <Text style={styles.value}>
                      {new Date(selectedEvent?.end).toLocaleString()}
                    </Text>
                  </View>
                </AccordionSection>

                {selectedEvent?.inventory &&
                  selectedEvent.inventory.length > 0 && (
                    <AccordionSection title="📦 Inventory" section="inventory">
                      {selectedEvent.inventory.map((item: Event) => (
                        <View key={item.id} style={styles.inventoryItem}>
                          <View style={styles.inventoryHeader}>
                            <Text style={styles.inventoryName}>
                              {item.name}
                            </Text>
                            <Text style={styles.inventoryUnit}>
                              {item.unit}
                            </Text>
                          </View>
                          <View style={styles.inventoryDetails}>
                            <View style={styles.inventoryRow}>
                              <Text style={styles.inventoryLabel}>
                                Planned:
                              </Text>
                              <Text style={styles.inventoryValue}>
                                {item.plannedQty}
                              </Text>
                            </View>
                            <View style={styles.inventoryRow}>
                              <Text style={styles.inventoryLabel}>Issued:</Text>
                              <Text style={styles.inventoryValue}>
                                {item.issuedQty}
                              </Text>
                            </View>
                            <View style={styles.inventoryRow}>
                              <Text style={styles.inventoryLabel}>
                                Returned:
                              </Text>
                              <Text style={styles.inventoryValue}>
                                {item.returnedQty}
                              </Text>
                            </View>
                            <View style={styles.inventoryRow}>
                              <Text style={styles.inventoryLabel}>Rate:</Text>
                              <Text style={styles.inventoryValue}>
                                ₹{item.rate}
                              </Text>
                            </View>
                          </View>
                        </View>
                      ))}
                    </AccordionSection>
                  )}

                {isEditMode && (
                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSaveEdit}
                  >
                    <Ionicons name="checkmark" size={20} color="#fff" />
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                )}
              </ScrollView>
            )}

            {/* Remove the entire !isEditMode section below */}
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
}
