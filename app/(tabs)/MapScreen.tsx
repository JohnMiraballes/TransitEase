import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Button, Alert, ActivityIndicator } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

// This component will be used in both HomeScreen and NavigationScreen
const MapScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Default to Manila, Philippines if location is not available
  const defaultLocation = { latitude: 14.5995, longitude: 120.9842 };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation(defaultLocation);
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);

      // Watch for live location updates
      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 2000, distanceInterval: 10 },
        (newLocation) => {
          setLocation(newLocation.coords);
        }
      );
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <MapView
          style={styles.map}
          region={{
            latitude: location ? location.latitude : defaultLocation.latitude,
            longitude: location ? location.longitude : defaultLocation.longitude,
            latitudeDelta: 0.01, // Zoomed in closer
            longitudeDelta: 0.01,
          }}
        >
          {location && <Marker coordinate={location} title="Your Location" />}
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default MapScreen;
