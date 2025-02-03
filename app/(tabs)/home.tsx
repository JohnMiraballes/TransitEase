import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define types for navigation
type RootStackParamList = {
  home: undefined;
  navigation: undefined;
  settings: undefined;
  about: undefined;
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;

type HomeScreenProps = {
  navigation: HomeScreenNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [location, setLocation] = useState<any>(null); // Store location data
  const [errorMsg, setErrorMsg] = useState<string | null>(null); // Store error messages
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard"); // Map type state

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000, distanceInterval: 1 },
        (newLocation) => setLocation(newLocation.coords)
      );
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Transit Made Easy</Text>

      {/* MapView with Toggle Option */}
      <MapView
        style={styles.map}
        mapType={mapType} // Dynamically set map type
        region={{
          latitude: location ? location.latitude : 14.5995,
          longitude: location ? location.longitude : 120.9842,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {location && (
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="Your Location" />
        )}
      </MapView>

      <Text style={styles.locationText}>{text}</Text>

      {/* Toggle Map Type Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => setMapType(mapType === "standard" ? "satellite" : "standard")}
      >
        <Text style={styles.buttonText}>
          Switch to {mapType === "standard" ? "Satellite" : "Standard"} View
        </Text>
      </TouchableOpacity>

      {/* Navigation Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("navigation")}>
        <Text style={styles.buttonText}>Start Navigation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "flex-start", alignItems: "center", padding: 20, backgroundColor: "#f0f0f0" },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10, color: "#333" },
  map: { width: "110%", height: "50%", marginVertical: 20 },
  locationText: { fontSize: 16, marginBottom: 20, color: "#333" },
  button: { backgroundColor: "#4CAF50", paddingVertical: 12, paddingHorizontal: 30, borderRadius: 5, marginTop: 10, justifyContent: "center", alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default HomeScreen;
