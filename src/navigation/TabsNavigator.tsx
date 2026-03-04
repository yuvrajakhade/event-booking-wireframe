import React from "react";
import { Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import BookedEventsScreen from "../screens/BookedEventsScreen";
import EnquiryListScreen from "../screens/EnquiryListScreen";
import CompletedEventsScreen from "../screens/CompletedEventsScreen";
import InventoryOverviewScreen from "../screens/InventoryOverviewScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { TabsParamList } from "../types";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator<TabsParamList>();

type TabsNavigatorProps = {
  onLogout: () => void;
};

export default function TabsNavigator({ onLogout }: TabsNavigatorProps) {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: "Swaraj Palace",
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontSize: 24,
          fontWeight: "900",
          color: "#FFFFFF",
          letterSpacing: 1,
          textShadowColor: "rgba(0, 0, 0, 0.3)",
          textShadowOffset: { width: 0, height: 2 },
          textShadowRadius: 4,
        },
        headerBackground: () => (
          <LinearGradient
            colors={["#667eea", "#764ba2", "#f093fb"] as any}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
        headerShadowVisible: true,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.bg,
        },
        tabBarIcon: ({ color, size }) => {
          const iconMap: Record<
            keyof TabsParamList,
            keyof typeof Ionicons.glyphMap
          > = {
            BookedEvents: "calendar",
            Enquiries: "chatbubbles",
            CompletedEvents: "checkmark-done-circle",
            Inventory: "cube",
            Profile: "person-circle",
          };

          return (
            <Ionicons name={iconMap[route.name]} size={size} color={color} />
          );
        },
      })}
    >
      <Tab.Screen
        name="BookedEvents"
        component={BookedEventsScreen}
        options={{ title: "Events" }}
      />
      <Tab.Screen
        name="Enquiries"
        component={EnquiryListScreen}
        options={{ title: "Enquiries" }}
      />
      <Tab.Screen
        name="CompletedEvents"
        component={CompletedEventsScreen}
        options={{ title: "Completed" }}
      />
      <Tab.Screen
        name="Inventory"
        component={InventoryOverviewScreen}
        options={{ title: "Inventory" }}
      />
      <Tab.Screen name="Profile" options={{ title: "Profile" }}>
        {() => <ProfileScreen onLogout={onLogout} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}
