import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator } from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";

const NavigationScreen = () => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [routes, setRoutes] = useState([
    {
      id: "1",
      duration: "12 min",
      traffic: "PWD-Friendly, step-free paths",
      coordinates: [
        { latitude: 14.55, longitude: 120.99 },
        { latitude: 14.56, longitude: 121.0 },
        { latitude: 14.58, longitude: 121.0 },
      ],
      isPWDRoute: true, // Step-Free Route
    },
    {
      id: "2",
      duration: "10 min",
      traffic: "Faster but may have stairs",
      coordinates: [
        { latitude: 14.55, longitude: 120.99 },
        { latitude: 14.58, longitude: 121.0 },
      ],
      isPWDRoute: false, // Not PWD-Friendly
    },
  ]);

  // Default location (Manila, Philippines) if GPS is unavailable
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
    })();
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location ? location.latitude : defaultLocation.latitude,
            longitude: location ? location.longitude : defaultLocation.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          {/* Show Routes */}
          {routes.map((route, index) => (
            <Polyline
              key={index}
              coordinates={route.coordinates}
              strokeWidth={4}
              strokeColor={route.isPWDRoute ? "green" : "blue"}
            />
          ))}

          {/* Start and End Markers */}
          {location && <Marker coordinate={location} title="Your Location" />}
          <Marker coordinate={{ latitude: 14.58, longitude: 121.0 }} title="Destination" />
        </MapView>
      )}

      {/* Route Options */}
      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.routeContainer, item.isPWDRoute && styles.pwdRoute]}>
            <Text style={styles.routeText}>{item.duration}</Text>
            <Text style={styles.trafficText}>{item.traffic}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Go Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  map: { width: "100%", height: 300 },
  routeContainer: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  pwdRoute: { backgroundColor: "#E6F9E6" }, // Highlight PWD-friendly route
  routeText: { fontSize: 16, fontWeight: "bold" },
  trafficText: { fontSize: 14, color: "#777" },
  button: { backgroundColor: "#4CAF50", padding: 12, borderRadius: 5, marginTop: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
});

export default NavigationScreen;
