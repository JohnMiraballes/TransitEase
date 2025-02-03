import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from '@expo/vector-icons'; // Importing the icon library
import { StyleSheet } from "react-native";

// Import Screens
import HomeScreen from "./home";
import NavigationScreen from "./navigation";
import AboutScreen from "./about";
import InstructionScreen from "./InstructionScreen";
import SettingsScreen from "./settings";
import MapScreen from "./MapScreen";
import AppsScreen from "./AppScreen";
import TeamScreen from "./TeamScreen";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="home" screenOptions={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle }}>
        {/* Home Screen */}
        <Stack.Screen
          name="home"
          component={HomeScreen}
          options={({ navigation }) => ({
            headerLeft: () => (
              <Ionicons
                name="home-outline" // Home icon
                size={24}
                color="white"
                style={{ marginLeft: 15 }}
                onPress={() => navigation.navigate("home")}
              />
            ),
            headerRight: () => (
              <Ionicons
                name="settings-outline" // Settings icon
                size={24}
                color="white"
                style={{ marginRight: 15 }}
                onPress={() => navigation.navigate("settings")}
              />
            ),
          })}
        />
        {/* Navigation Screen */}
        <Stack.Screen name="navigation" component={NavigationScreen} />
        {/* About Screen */}
        <Stack.Screen name="about" component={AboutScreen} />
        {/* Instruction Screen */}
        <Stack.Screen name="instruction" component={InstructionScreen} />
        {/* Map Screen */}
        <Stack.Screen name="map" component={MapScreen} />
        {/* Settings Screen */}
        <Stack.Screen name="settings" component={SettingsScreen} />
        {/* Apps Screen */}
        <Stack.Screen name="apps" component={AppsScreen} />
        {/* Team Screen */}
        <Stack.Screen name="team" component={TeamScreen} />
      </Stack.Navigator>
    
  );
}

// Simple Styles
const styles = StyleSheet.create({
  header: {
    backgroundColor: "#4CAF50", // Green color for the header
    height: 70, // Slightly taller header
  },
  headerTitle: {
    fontWeight: "bold", // Bold font for the header title
    color: "white", // White text for title
    fontSize: 20, // Slightly larger title text
  },
});
