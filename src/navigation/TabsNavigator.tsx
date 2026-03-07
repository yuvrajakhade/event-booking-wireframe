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
import { useMuhurt } from "../context/MuhurtContext";
import { TabsParamList } from "../types";
import { colors } from "../theme/colors";

const Tab = createBottomTabNavigator<TabsParamList>();
type MainTabName = Exclude<keyof TabsParamList, "Profile">;

const tabMeta: Record<
  MainTabName,
  { label: string; icon: keyof typeof Ionicons.glyphMap }
> = {
  BookedEvents: { label: "Events", icon: "calendar-number" },
  Enquiries: { label: "Enquiries", icon: "chatbubble-ellipses" },
  CompletedEvents: { label: "Completed", icon: "trophy" },
  Inventory: { label: "Inventory", icon: "grid" },
  Muhurt: { label: "Muhurt", icon: "sparkles" },
};

type TabsNavigatorProps = {
  onLogout?: () => void;
};

function HeaderActions() {
  const navigation = useNavigation<any>();
  const { todayMuhurtDates } = useMuhurt();

  return (
    <View style={styles.headerActionsWrap}>
      <Pressable
        onPress={() => navigation.navigate("Profile")}
        style={styles.profileButton}
      >
        <View style={styles.profileIconShell}>
          <Ionicons name="person-circle" size={24} color={colors.button} />
        </View>
      </Pressable>

      <Pressable
        onPress={() => navigation.navigate("Notifications")}
        style={styles.notificationButton}
      >
        <Ionicons
          name="notifications-outline"
          size={20}
          color={colors.button}
        />
        {todayMuhurtDates.length > 0 ? (
          <View style={styles.notificationBadge}>
            <Text style={styles.notificationBadgeText}>
              {todayMuhurtDates.length > 9 ? "9+" : todayMuhurtDates.length}
            </Text>
          </View>
        ) : null}
      </Pressable>
    </View>
  );
}

function HeaderTitle() {
  return (
    <View style={styles.headerTitleWrap}>
      <Ionicons name="business" size={20} color={colors.primary} />
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
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerTitle: () => <HeaderTitle />,
        headerTitleAlign: "center",
        headerRight: () => <HeaderActions />,
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
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: colors.primaryBg,
    borderRadius: 12,
    gap: 8,
    maxWidth: "65%",
  },
  headerBrandText: {
    color: colors.primary,
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: 1.5,
    textTransform: "uppercase",
    textShadowColor: "rgba(99, 102, 241, 0.2)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    flexShrink: 1,
  },
  profileButton: {
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
  headerActionsWrap: {
    marginRight: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.bg,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#dc2626",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  notificationBadgeText: {
    color: "white",
    fontSize: 10,
    fontWeight: "700",
    lineHeight: 12,
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
