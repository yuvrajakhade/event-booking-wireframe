import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
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
        headerTitleAlign: "center",
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
