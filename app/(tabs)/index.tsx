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
import SavedPlacesScreen from "./saved";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerStyle: styles.header, headerTitleStyle: styles.headerTitle }}>
        {/* Home Screen */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({ navigation }) => ({
            title: "Home", // Manually capitalize first letter
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
        <Stack.Screen name="navigation" component={NavigationScreen} options={{ title: "Navigation" }} />
        {/* About Screen */}
        <Stack.Screen name="about" component={AboutScreen} options={{ title: "About" }} />
        {/* Instruction Screen */}
        <Stack.Screen name="instruction" component={InstructionScreen} options={{ title: "Instruction" }} />
        {/* Map Screen */}
        <Stack.Screen name="map" component={MapScreen} options={{ title: "Map" }} />
        {/* Settings Screen */}
        <Stack.Screen name="settings" component={SettingsScreen} options={{ title: "Settings" }} />
        {/* Apps Screen */}
        <Stack.Screen name="apps" component={AppsScreen} options={{ title: "Apps" }} />
        {/* Team Screen */}
        <Stack.Screen name="team" component={TeamScreen} options={{ title: "Team" }} />
        {/* Saved Places Screen */}
        <Stack.Screen name="savedPlaces" component={SavedPlacesScreen} options={{ title: "Saved Places" }} />
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
