import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = {
  navigation: StackNavigationProp<any>;
};

type RouteType = {
  id: string;
  name: string;
  description: string;
  coordinates: { latitude: number; longitude: number };
  type: "step-free" | "regular"; // Distinguishing routes
};

const AccessibilityScreen: React.FC<Props> = ({ navigation }) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<MapView>(null);

  const routes: RouteType[] = [
    { id: "1", name: "Cabuyao Central Park", description: "Fully wheelchair-accessible with ramps.", coordinates: { latitude: 14.2786, longitude: 121.1251 }, type: "step-free" },
    { id: "2", name: "Cabuyao Public Market", description: "Ramps and smooth walkways for easy mobility.", coordinates: { latitude: 14.2776, longitude: 121.1239 }, type: "step-free" },
    { id: "3", name: "Sala Barangay Hall", description: "Smooth pathways and ramps for easy wheelchair access.", coordinates: { latitude: 14.2712, longitude: 121.1241 }, type: "step-free" },
    { id: "4", name: "Cabuyao City Hall", description: "Wheelchair accessible entrance, wheelchair accessible parking lot.", coordinates: { latitude: 14.2717, longitude: 121.1244 }, type: "step-free" },
    { id: "5", name: "Pamantasan ng Cabuyao", description: "Accessible pathways and elevators for PWDs.", coordinates: { latitude: 14.2595, longitude: 121.1338 }, type: "step-free" },
    { id: "6", name: "St. Polycarp Parish Church", description: "Accessible pathways for PWDs and wheelchair users.", coordinates: { latitude: 14.2800, longitude: 121.1240 }, type: "step-free" },
  ];

  const defaultLocation = { latitude: 14.2786, longitude: 121.1251 };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation(defaultLocation);
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
      setLoading(false);
    })();
  }, []);

  const centerMapOnRoute = (coordinates: { latitude: number; longitude: number }) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          ...coordinates,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const goToMyLocation = async () => {
    let currentLocation = await Location.getCurrentPositionAsync({});
    setLocation({
      latitude: currentLocation.coords.latitude,
      longitude: currentLocation.coords.longitude,
    });

    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  return (
    <View style={styles.container}>
      {/* Header with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Accessibility Routes</Text>
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <MapView
            ref={mapRef}
            style={styles.map}
            initialRegion={{
              latitude: location ? location.latitude : defaultLocation.latitude,
              longitude: location ? location.longitude : defaultLocation.longitude,
              latitudeDelta: 0.03,
              longitudeDelta: 0.03,
            }}
          >
            {/* Render Markers */}
            {routes.map((route) => (
              <Marker key={route.id} coordinate={route.coordinates}>
                <View style={styles.marker}>
                  <Ionicons name="accessibility" size={24} color="white" />
                </View>
                <Callout>
                  <Text style={{ fontWeight: "bold" }}>{route.name}</Text>
                  <Text>{route.description}</Text>
                </Callout>
              </Marker>
            ))}
            {/* User's Current Location */}
            {location && (
              <Marker coordinate={location} title="Your Location">
                <Ionicons name="location-sharp" size={30} color="blue" />
              </Marker>
            )}
          </MapView>
        )}
      </View>

      {/* Floating Button to Go to Current Location */}
      <TouchableOpacity style={styles.floatingButton} onPress={goToMyLocation}>
        <Ionicons name="locate" size={30} color="white" />
      </TouchableOpacity>

      {/* Route List Section */}
      <View style={styles.scrollContainer}>
        <Text style={styles.listHeader}>Accessible Routes</Text>
        <FlatList
          data={routes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => centerMapOnRoute(item.coordinates)}>
              <View style={styles.routeCard}>
                <Ionicons
                  name="walk"
                  size={24}
                  color="#388E3C"
                  style={{ marginRight: 10 }}
                />
                <View>
                  <Text style={styles.routeName}>{item.name}</Text>
                  <Text style={styles.routeDescription}>{item.description}</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    backgroundColor: "#4CAF50",
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",  // Center content horizontally
  },
  headerText: {
    flex: 1, // Allows it to take up space and center properly
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
    textAlign: "center", // Ensures text is centered
  },
  mapContainer: { flex: 2 },
  map: { width: "100%", height: "100%" },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 50,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
  },
  scrollContainer: { flex: 2, backgroundColor: "#E8F5E9" },
  listHeader: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2E7D32",
    padding: 10,
    textAlign: "left",
  },
  routeCard: {
    backgroundColor: "#C8E6C9",
    marginVertical: 5,
    marginHorizontal: 10,
    padding: 15,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  routeName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#2E7D32",
  },
  routeDescription: {
    fontSize: 14,
    color: "#666",
    flexWrap: "wrap", // Ensures text wraps within the container
    maxWidth: "90%",
  },
  marker: {
    padding: 5,
    backgroundColor: "#388E3C",
    borderRadius: 10,
  },
});

export default AccessibilityScreen;
