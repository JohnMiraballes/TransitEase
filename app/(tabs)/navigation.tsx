import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, Alert 
} from "react-native";
import * as Location from "expo-location";
import MapView, { Polyline, Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // Import Icons

const NavigationScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);

  const stepFreeRoutes = [
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
  ];

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

  const handleSelectRoute = (id: string) => {
    setSelectedRoute(id);
  };

  const handleStartNavigation = () => {
    if (!selectedRoute) {
      Alert.alert("Select a Route", "Please choose a step-free route before starting.");
      return;
    }
    Alert.alert("Navigation Started", "Follow the selected step-free route.");
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Navigation</Text>
      </View>

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
          {stepFreeRoutes.map((route) => (
            <Polyline
              key={route.id}
              coordinates={route.coordinates}
              strokeWidth={6}
              strokeColor={selectedRoute === route.id ? "darkgreen" : "green"}
            />
          ))}
          {location && <Marker coordinate={location} title="Your Location" />}
          <Marker coordinate={{ latitude: 14.58, longitude: 121.0 }} title="Destination" />
        </MapView>
      )}

      <FlatList
        data={stepFreeRoutes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[styles.routeContainer, item.isPWDRoute && styles.pwdRoute, selectedRoute === item.id && styles.selectedRoute]}
            onPress={() => handleSelectRoute(item.id)}
          >
            <Text style={styles.routeText}>{item.duration}</Text>
            <Text style={styles.trafficText}>{item.traffic}</Text>
          </TouchableOpacity>
        )}
      />

      <TouchableOpacity style={styles.button} onPress={handleStartNavigation}>
        <Text style={styles.buttonText}>Go Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green header for easy visibility
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    padding: 10,
    position: "absolute",
    left: 0,
    zIndex: 1,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  map: { width: "100%", height: 300 },
  routeContainer: {
    padding: 15,
    marginVertical: 8,
    borderRadius: 12,
    backgroundColor: "#e8f5e9", // Light green background for routes
    borderWidth: 1,
    borderColor: "#d0f1d7",
  },
  pwdRoute: { backgroundColor: "#e0f7fa" }, // Highlight PWD-friendly routes
  selectedRoute: { backgroundColor: "#A5D6A7" }, // Highlight selected route
  routeText: { fontSize: 18, fontWeight: "bold", color: "#388E3C" }, // Larger text size
  trafficText: { fontSize: 16, color: "#777" },
  button: {
    backgroundColor: "#4CAF50", 
    padding: 14, 
    borderRadius: 10, 
    marginTop: 15, 
    alignItems: "center", 
    elevation: 5, // Shadow for Android
  },
  buttonText: { color: "#fff", fontSize: 20, fontWeight: "bold" },
});

export default NavigationScreen;
