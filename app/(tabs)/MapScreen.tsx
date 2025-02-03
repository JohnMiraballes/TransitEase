import React, { useState } from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

const MapScreen = () => {
  const [location, setLocation] = useState<string | null>(null);

  // Handle auto-pin functionality (later can integrate geolocation)
  const handleAutoPin = () => {
    // Example: Later replace this with geolocation API
    setLocation("Latitude: 37.7749, Longitude: -122.4194"); // Example coordinates
    Alert.alert("Auto-Pin functionality", "Your location has been pinned!");
  };

  const handleFindStepFreeRoute = () => {
    // Later, you can integrate a step-free route feature here
    Alert.alert("Step-Free Route", "Finding step-free route...");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Map Screen</Text>
      <Button title="Auto-Pin Location" onPress={handleAutoPin} />
      {location && <Text style={styles.locationText}>Pinned Location: {location}</Text>}
      <Button title="Find Step-Free Route" onPress={handleFindStepFreeRoute} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  locationText: {
    marginTop: 10,
    fontSize: 16,
    color: "green",
  },
});

export default MapScreen;
