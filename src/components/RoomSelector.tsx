import React, { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "../theme/colors";
import { styles } from "../theme/styles/RoomSelector.styles";

interface Props {
  label: string;
  selectedRooms: string[];
  onSelect: (rooms: string[]) => void;
}

const ROOM_SECTIONS = {
  "Phase 1": Array.from({ length: 9 }, (_, i) => `${101 + i}`),
  "Phase 2": Array.from({ length: 6 }, (_, i) => `${101 + i}`),
  Others: [
    ...Array.from({ length: 10 }, (_, i) => `${101 + i}`),
    ...Array.from({ length: 10 }, (_, i) => `${201 + i}`),
    ...Array.from({ length: 10 }, (_, i) => `${301 + i}`),
    ...Array.from({ length: 10 }, (_, i) => `${401 + i}`),
  ],
};

export default function RoomSelector({
  label,
  selectedRooms,
  onSelect,
}: Props) {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggleRoom = (room: string) => {
    if (selectedRooms.includes(room)) {
      onSelect(selectedRooms.filter((r) => r !== room));
    } else {
      onSelect([...selectedRooms, room]);
    }
  };

  const handleSelectAll = (section: string) => {
    const sectionRooms =
      ROOM_SECTIONS[section as keyof typeof ROOM_SECTIONS] || [];
    const allSelected = sectionRooms.every((room) =>
      selectedRooms.includes(room),
    );

    if (allSelected) {
      onSelect(selectedRooms.filter((r) => !sectionRooms.includes(r)));
    } else {
      onSelect([...new Set([...selectedRooms, ...sectionRooms])]);
    }
  };

  const displayText =
    selectedRooms.length === 0
      ? "Select rooms..."
      : `${selectedRooms.length} room(s) selected`;

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <Pressable
        style={[styles.input, isOpen && styles.inputActive]}
        onPress={() => setIsOpen(!isOpen)}
      >
        <Text
          style={[
            styles.inputText,
            !selectedRooms.length && styles.placeholder,
          ]}
        >
          {displayText}
        </Text>
        <Ionicons
          name={isOpen ? "chevron-up" : "chevron-down"}
          size={20}
          color="white"
        />
      </Pressable>

      {isOpen && (
        <ScrollView
          nestedScrollEnabled={true}
          style={styles.dropdown}
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(ROOM_SECTIONS).map(([section, rooms]) => {
            const sectionAllSelected = rooms.every((room) =>
              selectedRooms.includes(room),
            );

            return (
              <View key={section} style={styles.section}>
                <Pressable
                  style={styles.sectionHeader}
                  onPress={() => handleSelectAll(section)}
                >
                  <Ionicons
                    name={sectionAllSelected ? "checkbox" : "checkbox-outline"}
                    size={20}
                    color={
                      sectionAllSelected ? "white" : "rgba(255, 255, 255, 0.5)"
                    }
                  />
                  <Text
                    style={[
                      styles.sectionTitle,
                      sectionAllSelected && styles.sectionTitleActive,
                    ]}
                  >
                    {section} ({rooms.length})
                  </Text>
                </Pressable>

                <View style={styles.roomsGrid}>
                  {rooms.map((room) => {
                    const isSelected = selectedRooms.includes(room);
                    return (
                      <Pressable
                        key={room}
                        style={[
                          styles.roomItem,
                          isSelected && styles.roomItemActive,
                        ]}
                        onPress={() => handleToggleRoom(room)}
                      >
                        <Ionicons
                          name={isSelected ? "checkbox" : "checkbox-outline"}
                          size={18}
                          color={
                            isSelected ? "white" : "rgba(255, 255, 255, 0.5)"
                          }
                        />
                        <Text
                          style={[
                            styles.roomText,
                            isSelected && styles.roomTextActive,
                          ]}
                        >
                          {room}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  );
}
