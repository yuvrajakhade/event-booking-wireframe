import React, { useMemo, useState } from "react";
import { View, Text, TextInput, FlatList, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import DateRangeBar from "../../../components/DateRangeBar";
import ListCard from "../../../components/ListCard";
import { mockEnquiries } from "../../../data/mock";
import { colors } from "../../../theme/colors";
import { styles } from "../styles/EnquiryListScreen.styles";

export default function EnquiryListScreen() {
  const navigation = useNavigation<any>();
  const [from, setFrom] = useState("2026-03-01");
  const [to, setTo] = useState("2026-03-31");
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    return mockEnquiries.filter((e) => {
      const isActiveEnquiry = e.status !== "Converted";
      const inRange = e.eventDate >= from && e.eventDate <= to;
      const matches = (e.name + (e.phone ?? ""))
        .toLowerCase()
        .includes(q.toLowerCase());
      return isActiveEnquiry && inRange && matches;
    });
  }, [from, to, q]);

  const handleViewEnquiry = (enquiry: (typeof mockEnquiries)[0]) => {
    Alert.alert(
      "Enquiry Details",
      `Name: ${enquiry.name}\nMobile: ${enquiry.phone}\nEvent Date: ${enquiry.eventDate}\nStatus: ${enquiry.status}`,
      [{ text: "Close" }],
    );
  };

  const handleConvertEnquiry = (enquiry: (typeof mockEnquiries)[0]) => {
    if (enquiry.status === "Converted") {
      Alert.alert(
        "Already Converted",
        "This enquiry has already been converted to a booking.",
      );
      return;
    }

    Alert.alert(
      "Convert Enquiry to Booking?",
      `Convert ${enquiry.name}'s enquiry to a confirmed booking?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Convert",
          style: "default",
          onPress: () => {
            // Navigate to EventFormScreen with enquiry data pre-filled
            navigation.navigate("EventForm", {
              mode: "add",
              enquiryData: {
                name: enquiry.name,
                phone: enquiry.phone,
                eventDate: enquiry.eventDate,
                guests: enquiry.guests,
              },
            });
            Alert.alert(
              "Success",
              "Enquiry converted to booking! Please fill in the event details.",
            );
          },
        },
      ],
    );
  };

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
            <Ionicons name="search" size={16} color={colors.subtitle} />
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder="Search name/phone"
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
              title={`Status: ${item.status}`}
              date={item.eventDate}
              mobile={item.phone ?? "-"}
              venue={item.source ?? "-"}
              eventName={item.name}
              detailedFormat={true}
              actions={[
                { label: "View", onPress: () => handleViewEnquiry(item) },
                { label: "Book", onPress: () => handleConvertEnquiry(item) },
              ]}
            />
          )}
        />
      </View>
    </View>
  );
}
