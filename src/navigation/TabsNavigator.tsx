import React from "react";
import { Text, View, Pressable } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import BookedEventsScreen from "../screens/BookedEventsScreen";
import EnquiryListScreen from "../screens/EnquiryListScreen";
import CompletedEventsScreen from "../screens/CompletedEventsScreen";
import InventoryOverviewScreen from "../screens/InventoryOverviewScreen";
import MuhurtScreen from "../screens/MuhurtScreen";
import { TabsParamList } from "../types";

const Tab = createBottomTabNavigator<TabsParamList>();
type MainTabName = Exclude<keyof TabsParamList, "Profile">;

const tabMeta: Record<
  MainTabName,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  BookedEvents: { label: "Events", icon: "calendar" },
  Enquiries: { label: "Enquiries", icon: "chatbubbles" },
  CompletedEvents: { label: "Completed", icon: "checkmark-done-circle" },
  Inventory: { label: "Inventory", icon: "cube" },
  Muhurt: { label: "Muhurt", icon: "star" },
};

type TabsNavigatorProps = {
  onLogout?: () => void;
};

function HeaderTitle() {
  return (
    <View className="rounded-xl bg-slate-100 px-3 py-1">
      <Text className="text-lg font-extrabold tracking-wide text-slate-900">
        SWOJUS PALACE
      </Text>
    </View>
  );
}

type TabButtonProps = BottomTabBarButtonProps & { routeName: MainTabName };

function TabButton({
  accessibilityState,
  routeName,
  onLongPress,
  onPress,
}: TabButtonProps) {
  const isFocused = Boolean(accessibilityState?.selected);
  const meta = tabMeta[routeName];

  return (
    <Pressable
      onLongPress={onLongPress}
      onPress={onPress}
      className="flex-1 items-center justify-center"
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={meta.label}
    >
      <View
        className={`w-full items-center rounded-lg py-2 ${
          isFocused ? "bg-blue-50" : "bg-transparent"
        }`}
      >
        <Ionicons
          name={meta.icon}
          size={22}
          color={isFocused ? "#1d4ed8" : "#64748b"}
        />
        <Text
          className={`mt-0.5 text-[10px] font-semibold ${
            isFocused ? "text-blue-700" : "text-slate-500"
          }`}
        >
          {meta.label}
        </Text>
      </View>
    </Pressable>
  );
}

export default function TabsNavigator({ onLogout }: TabsNavigatorProps = {}) {
  const ProfileButton = () => {
    const navigation = useNavigation<any>();

    return (
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        className="mr-3 rounded-full bg-blue-50 p-2"
      >
        <Ionicons name="person-circle" size={24} color="#1d4ed8" />
      </Pressable>
    );
  };

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        headerRight: () => <ProfileButton />,
        headerStyle: {
          backgroundColor: "#ffffff",
        },
        headerTintColor: "#0f172a",
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: "#e2e8f0",
          backgroundColor: "#ffffff",
          borderTopWidth: 1,
          height: 74,
          paddingBottom: 8,
          paddingTop: 6,
          width: "100%",
        },
        tabBarButton: (props) => (
          <TabButton {...props} routeName={route.name as MainTabName} />
        ),
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
      <Tab.Screen
        name="Muhurt"
        component={MuhurtScreen}
        options={{ title: "Muhurt" }}
      />
    </Tab.Navigator>
  );
}
