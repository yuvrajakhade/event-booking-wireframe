import "react-native-gesture-handler";
import "./global.css";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./src/navigation/RootNavigator";
import { StatusBar } from "expo-status-bar";
import { MuhurtProvider } from "./src/context/MuhurtContext";

export default function App() {
  return (
    <MuhurtProvider>
      <NavigationContainer>
        <StatusBar style="dark" />
        <RootNavigator />
      </NavigationContainer>
    </MuhurtProvider>
  );
}
