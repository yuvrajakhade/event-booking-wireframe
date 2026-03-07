import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useMuhurt } from "../../../context/MuhurtContext";
import { colors } from "../../../theme/colors";

export default function NotificationsScreen() {
  const { todayMuhurtDates } = useMuhurt();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>
      <Text style={styles.subtitle}>Muhurt reminders for today</Text>

      <FlatList
        data={todayMuhurtDates}
        keyExtractor={(item) => item.id}
        contentContainerStyle={
          todayMuhurtDates.length ? styles.listContent : styles.emptyContent
        }
        renderItem={({ item }) => (
          <View style={styles.notificationCard}>
            <Ionicons name="calendar" size={18} color={colors.primary} />
            <View style={styles.notificationTextWrap}>
              <Text style={styles.notificationTitle}>{item.description}</Text>
              <Text style={styles.notificationDate}>{item.date}</Text>
            </View>
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyWrap}>
            <Ionicons
              name="notifications-off-outline"
              size={42}
              color={colors.secondaryDark}
            />
            <Text style={styles.emptyTitle}>No notifications for today</Text>
            <Text style={styles.emptySubtitle}>
              You will see Muhurt reminders here when a date matches today.
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    paddingHorizontal: 16,
    paddingTop: 18,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.title,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 14,
    color: colors.secondary,
    fontSize: 14,
  },
  listContent: {
    gap: 10,
    paddingBottom: 20,
  },
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.bgLight,
  },
  notificationTextWrap: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.title,
  },
  notificationDate: {
    marginTop: 2,
    color: colors.secondary,
    fontSize: 13,
  },
  emptyContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  emptyWrap: {
    alignItems: "center",
    paddingHorizontal: 20,
  },
  emptyTitle: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: "700",
    color: colors.title,
  },
  emptySubtitle: {
    marginTop: 4,
    textAlign: "center",
    color: colors.secondary,
  },
});
