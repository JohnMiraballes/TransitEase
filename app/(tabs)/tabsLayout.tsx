import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Importing the icon library

// Import Screens
import HomeScreen from "./HomeScreen";
import NavigationScreen from "./navigation";
import AboutScreen from "./about";
import InstructionScreen from "./InstructionScreen";
import SettingsScreen from "./settings";
import AppsScreen from "./AppScreen";
import TeamScreen from "./TeamScreen";

const Tab = createBottomTabNavigator();

// Define a type for the accepted icon names
type IconName = 
  | "home-outline"
  | "map-outline"
  | "information-circle-outline"
  | "book-outline"
  | "location-outline"
  | "settings-outline"
  | "apps-outline"
  | "people-outline";

export default function TabsLayout() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: IconName | undefined;

          switch (route.name) {
            case "Home":
              iconName = "home-outline";
              break;
            case "Navigation":
              iconName = "map-outline";
              break;
            case "About":
              iconName = "information-circle-outline";
              break;
            case "Instruction":
              iconName = "book-outline";
              break;
            case "Map":
              iconName = "location-outline";
              break;
            case "Settings":
              iconName = "settings-outline";
              break;
            case "Apps":
              iconName = "apps-outline";
              break;
            case "Team":
              iconName = "people-outline";
              break;
            default:
              iconName = undefined;
          }

          // Return the Ionicon with the correct icon name
          if (iconName) {
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          return null; // Return null if no iconName is assigned
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Navigation" component={NavigationScreen} />
      <Tab.Screen name="About" component={AboutScreen} />
      <Tab.Screen name="Instruction" component={InstructionScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Apps" component={AppsScreen} />
      <Tab.Screen name="Team" component={TeamScreen} />
    </Tab.Navigator>
  );
}
