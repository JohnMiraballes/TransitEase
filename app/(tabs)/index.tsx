import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName: keyof typeof Ionicons.glyphMap = "home"; // Set a default icon

        if (route.name === "navigation") iconName = "map-outline";
        else if (route.name === "settings") iconName = "settings-outline";
        else if (route.name === "about") iconName = "information-circle-outline";

        return <Ionicons name={iconName} size={size} color={color} />;
      },
    })}>
      <Tabs.Screen name="home" options={{ title: "Home" }} />
      <Tabs.Screen name="navigation" options={{ title: "Navigate" }} />
      <Tabs.Screen name="settings" options={{ title: "Settings" }} />
      <Tabs.Screen name="about" options={{ title: "About" }} />
    </Tabs>
  );
}