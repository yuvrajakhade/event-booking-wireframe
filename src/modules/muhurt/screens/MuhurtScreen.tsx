import React, { useState } from "react";
import { View, Text, Pressable, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../../theme/colors";
import FormRow from "../../../components/FormRow";
import { useMuhurt } from "../../../context/MuhurtContext";
import { styles } from "../styles/MuhurtScreen.styles";

export default function MuhurtScreen() {
  const { muhurtDates, addMuhurtDate, removeMuhurtDate } = useMuhurt();

  const [newDate, setNewDate] = useState("");
  const [newDescription, setNewDescription] = useState("");

  const handleAddMuhurt = () => {
    if (!newDate) {
      Alert.alert("Error", "Please enter a date");
      return;
    }

    addMuhurtDate({
      date: newDate,
      description: newDescription || "Special Muhurt Date",
    });
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
            removeMuhurtDate(id);
          },
        },
      ],
    );
  };

  const filteredDates = muhurtDates;

  return (
    <View style={[styles.gradient, { backgroundColor: colors.bg }]}>
      <View style={styles.container}>
        <View style={styles.addSection}>
          <View style={[styles.card, { backgroundColor: colors.bgLight }]}>
            <View style={styles.cardHeader}>
              <Text style={[styles.sectionTitle, { color: colors.title }]}>
                Add New Muhurt Date
              </Text>
            </View>
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
            <Pressable
              style={[styles.addButton, { backgroundColor: colors.accent }]}
              onPress={handleAddMuhurt}
            >
              <Ionicons
                name="add-circle"
                size={20}
                color="white"
                style={styles.addButtonIcon}
              />
              <Text style={styles.addButtonText}>Add Muhurt Date</Text>
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
    </View>
  );
}
