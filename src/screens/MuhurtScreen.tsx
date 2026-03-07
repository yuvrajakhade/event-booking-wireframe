import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  FlatList,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../theme/colors";
import FormRow from "../components/FormRow";

interface MuhurtDate {
  id: string;
  date: string;
  description: string;
}

export default function MuhurtScreen() {
  const [muhurtDates, setMuhurtDates] = useState<MuhurtDate[]>([
    {
      id: "1",
      date: "2026-03-15",
      description: "Holi Celebration",
    },
    {
      id: "2",
      date: "2026-04-14",
      description: "New Year (Hindi Calendar)",
    },
  ]);

  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddMuhurt = () => {
    if (!newDate) {
      Alert.alert("Error", "Please enter a date");
      return;
    }

    const newMuhurt: MuhurtDate = {
      id: Date.now().toString(),
      date: newDate,
      description: newDescription || "Special Muhurt Date",
    };

    setMuhurtDates([...muhurtDates, newMuhurt]);
    setNewDate("");
    setNewDescription("");
    Alert.alert("Success", "Muhurt date added successfully");
  };

  const handleDeleteMuhurt = (id: string) => {
    Alert.alert(
      "Delete Muhurt Date",
      "Are you sure you want to delete this date?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setMuhurtDates(muhurtDates.filter((m) => m.id !== id));
          },
        },
      ],
    );
  };

  const filteredDates = muhurtDates;

  return (
    <LinearGradient
      colors={colors.gradients.soft as any}
      style={styles.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
    >
      <View style={styles.container}>
        <View style={styles.addSection}>
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>Add New Muhurt Date</Text>
            <FormRow
              label="Date (YYYY-MM-DD)"
              value={newDate}
              onChangeText={setNewDate}
              placeholder="2026-03-15"
              variant="light"
            />
            <FormRow
              label="Description"
              value={newDescription}
              onChangeText={setNewDescription}
              placeholder="Enter occasion name"
              variant="light"
            />
            <Pressable onPress={handleAddMuhurt}>
              <LinearGradient
                colors={colors.gradients.primary as any}
                style={styles.addButton}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="add-circle" size={20} color="white" />
                <Text style={styles.addButtonText}>Add Muhurt Date</Text>
              </LinearGradient>
            </Pressable>
          </View>
        </View>

        <View style={styles.listSection}>
          <Text style={styles.listTitle}>
            Saved Muhurt Dates ({filteredDates.length})
          </Text>
          <FlatList
            data={filteredDates}
            keyExtractor={(item) => item.id}
            scrollEnabled={true}
            nestedScrollEnabled={true}
            renderItem={({ item }) => (
              <View style={styles.muhurtCard}>
                <View style={styles.muhurtContent}>
                  <View style={styles.dateIconCircle}>
                    <Ionicons
                      name="calendar-outline"
                      size={20}
                      color="#667eea"
                    />
                  </View>
                  <View style={styles.muhurtDetails}>
                    <Text style={styles.muhurtDate}>{item.date}</Text>
                    <Text style={styles.muhurtDescription}>
                      {item.description}
                    </Text>
                  </View>
                  <Pressable
                    onPress={() => handleDeleteMuhurt(item.id)}
                    style={styles.deleteButton}
                  >
                    <Ionicons name="trash-outline" size={22} color="#dc2626" />
                  </Pressable>
                </View>
              </View>
            )}
            ListEmptyComponent={
              <View style={styles.emptyState}>
                <Ionicons name="calendar-outline" size={64} color="#999" />
                <Text style={styles.emptyText}>No muhurt dates added yet</Text>
                <Text style={styles.emptySubtext}>
                  Add special dates above to track them
                </Text>
              </View>
            }
          />
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  addSection: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 16,
  },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    borderRadius: 14,
    marginTop: 12,
    gap: 8,
    shadowColor: "#667eea",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  addButtonText: {
    color: "white",
    fontWeight: "800",
    fontSize: 16,
  },
  listSection: {
    flex: 1,
    minHeight: 300,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  muhurtCard: {
    backgroundColor: "rgba(255, 255, 255, 0.98)",
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  muhurtContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
  },
  dateIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(102, 126, 234, 0.1)",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  muhurtDetails: {
    flex: 1,
  },
  muhurtDate: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.text,
    marginBottom: 4,
  },
  muhurtDescription: {
    fontSize: 14,
    color: colors.muted,
    fontWeight: "500",
  },
  deleteButton: {
    padding: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 48,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginTop: 16,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.muted,
    textAlign: "center",
  },
});
