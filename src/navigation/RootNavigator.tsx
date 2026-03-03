import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabsNavigator from "./TabsNavigator";
import CheckInScreen from "../screens/CheckInScreen";
import CheckOutScreen from "../screens/CheckOutScreen";
import MissingInventoryScreen from "../screens/MissingInventoryScreen";
import EventFormScreen from "../screens/EventFormScreen";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import { RootStackParamList } from "../types";
import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator<RootStackParamList>();
const AUTH_STORAGE_KEY = "@event_ui/authenticated";

export default function RootNavigator() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(true);

  React.useEffect(() => {
    const restoreAuth = async () => {
      try {
        const value = await AsyncStorage.getItem(AUTH_STORAGE_KEY);
        setIsAuthenticated(value === "true");
      } finally {
        setIsLoadingAuth(false);
      }
    };

    restoreAuth();
  }, []);

  const handleLogin = React.useCallback(async () => {
    setIsAuthenticated(true);
    await AsyncStorage.setItem(AUTH_STORAGE_KEY, "true");
  }, []);

  const handleLogout = React.useCallback(async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem(AUTH_STORAGE_KEY);
  }, []);

  if (isLoadingAuth) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color={colors.primary} size="large" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerTitleAlign: "center" }}>
      {!isAuthenticated ? (
        <>
          <Stack.Screen name="Login" options={{ headerShown: false }}>
            {() => <LoginScreen onLogin={handleLogin} />}
          </Stack.Screen>
          <Stack.Screen name="Register" options={{ title: "Register" }}>
            {() => <RegisterScreen onRegister={handleLogin} />}
          </Stack.Screen>
        </>
      ) : (
        <>
          <Stack.Screen name="Tabs" options={{ headerShown: false }}>
            {() => <TabsNavigator onLogout={handleLogout} />}
          </Stack.Screen>
          <Stack.Screen
            name="EventForm"
            component={EventFormScreen}
            options={{ title: "Event (Add/Edit)" }}
          />
          <Stack.Screen
            name="CheckIn"
            component={CheckInScreen}
            options={{ title: "Check-In" }}
          />
          <Stack.Screen
            name="CheckOut"
            component={CheckOutScreen}
            options={{ title: "Check-Out" }}
          />
          <Stack.Screen
            name="MissingInventory"
            component={MissingInventoryScreen}
            options={{ title: "Missing Inventory" }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: "center",
    justifyContent: "center",
  },
});
