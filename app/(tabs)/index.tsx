import * as React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Import Screens
import HomeScreen from "./HomeScreen";
import NavigationScreen from "./navigation";
import AboutScreen from "./about";
import InstructionScreen from "./InstructionScreen";
import SettingsScreen from "./settings";
import AppsScreen from "./AppScreen";
import TeamScreen from "./TeamScreen";
import SavedPlacesScreen from "./saved";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./Profile";

// Create the stack navigator
const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="navigation" component={NavigationScreen} />
        <Stack.Screen name="about" component={AboutScreen} />
        <Stack.Screen name="instruction" component={InstructionScreen} />
        <Stack.Screen name="settings" component={SettingsScreen} />
        <Stack.Screen name="apps" component={AppsScreen} />
        <Stack.Screen name="team" component={TeamScreen} />
        <Stack.Screen name="savedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
