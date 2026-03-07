import React from "react";
import { Text, View, Pressable, StyleSheet } from "react-native";
import {
  createBottomTabNavigator,
  BottomTabBarButtonProps,
} from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  BookedEventsScreen,
  EnquiryListScreen,
  CompletedEventsScreen,
} from "../modules/events/screens";
import { InventoryOverviewScreen } from "../modules/inventory/screens";
import { MuhurtScreen } from "../modules/muhurt/screens";
import { TabsParamList } from "../types";
import { colors } from "../theme/colors";

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
    <View style={styles.headerTitleWrap}>
      <Text style={styles.headerBrandText}>SWOJUS PALACE</Text>
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
      style={styles.tabPressable}
      accessibilityRole="button"
      accessibilityState={accessibilityState}
      accessibilityLabel={meta.label}
    >
      <View
        style={[
          styles.tabInner,
          isFocused ? styles.tabInnerFocused : styles.tabInnerDefault,
        ]}
      >
        <Ionicons name={meta.icon} size={22} color={colors.button} />
        <Text style={[styles.tabLabel, isFocused && styles.tabLabelFocused]}>
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
        style={styles.profileButton}
      >
        <View style={styles.profileIconShell}>
          <Ionicons name="person" size={18} color={colors.button} />
        </View>
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
          backgroundColor: colors.bgLight,
        },
        headerTintColor: colors.title,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.bgLight,
          borderTopWidth: 1,
          height: 78,
          paddingBottom: 8,
          paddingTop: 8,
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

const styles = StyleSheet.create({
  headerTitleWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 2,
    gap: 9,
  },
  headerBrandText: {
    color: colors.secondary,
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: 0.8,
    fontStyle: "italic",
    textShadowColor: "rgba(0, 0, 0, 0.12)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  profileButton: {
    marginRight: 12,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  profileIconShell: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.card,
    alignItems: "center",
    justifyContent: "center",
  },
  tabPressable: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  tabInner: {
    width: "92%",
    alignItems: "center",
    borderRadius: 12,
    paddingVertical: 8,
  },
  tabInnerFocused: {
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
  },
  tabInnerDefault: {
    backgroundColor: "transparent",
  },
  tabLabel: {
    marginTop: 3,
    fontSize: 11,
    fontWeight: "600",
    color: colors.secondaryDark,
    letterSpacing: 0.2,
  },
  tabLabelFocused: {
    color: colors.secondary,
    fontWeight: "800",
    letterSpacing: 0.3,
  },
});
