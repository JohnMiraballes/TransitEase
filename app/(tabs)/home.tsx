import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Alert,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define types for navigation
type RootStackParamList = {
  home: undefined;
  navigation: undefined;
  savedPlaces: undefined; // Add savedPlaces route
};

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "home">;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentLocations, setRecentLocations] = useState<{ latitude: number; longitude: number }[]>([]);
  const [homeLocation, setHomeLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [workLocation, setWorkLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [mapType, setMapType] = useState<"standard" | "satellite">("standard");
  const [loading, setLoading] = useState(true);

  // Default to Manila, Philippines if location is not available
  const defaultLocation = { latitude: 14.5995, longitude: 120.9842 };

  // Load saved Home and Work locations
  useEffect(() => {
    const loadSavedLocations = async () => {
      const home = await AsyncStorage.getItem("homeLocation");
      const work = await AsyncStorage.getItem("workLocation");

      if (home) setHomeLocation(JSON.parse(home));
      if (work) setWorkLocation(JSON.parse(work));
    };

    loadSavedLocations();
  }, []);

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
          setRecentLocations((prev) => [...prev.slice(-2), newLocation.coords]); // Keep last 3 locations
        }
      );
    })();
  }, []);

  // Save Home or Work location
  const saveLocation = async (type: "home" | "work") => {
    if (!location) return;
    await AsyncStorage.setItem(`${type}Location`, JSON.stringify(location));
    if (type === "home") setHomeLocation(location);
    else setWorkLocation(location);

    Alert.alert("Saved!", `${type.charAt(0).toUpperCase() + type.slice(1)} location saved successfully.`);
  };

  // Navigate to Home or Work location
  const navigateToSavedLocation = (savedLocation: { latitude: number; longitude: number } | null) => {
    if (savedLocation) {
      setLocation(savedLocation);
    } else {
      Alert.alert("Not Set", "Please set this location first.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <TextInput style={styles.searchBar} placeholder="Where to?" value={searchQuery} onChangeText={setSearchQuery} />

      {/* Quick Access Buttons */}
      <View style={styles.quickAccess}>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigateToSavedLocation(homeLocation)}>
          <Text>🏠 Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickButton} onPress={() => navigateToSavedLocation(workLocation)}>
          <Text>🏢 Work</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.quickButton}
          onPress={() =>
            Alert.alert("Save Location", "Set this location as Home or Work?", [
              { text: "Home", onPress: () => saveLocation("home") },
              { text: "Work", onPress: () => saveLocation("work") },
              { text: "Cancel", style: "cancel" },
            ])
          }
        >
          <Text>➕ Add</Text>
        </TouchableOpacity>
      </View>

      {/* Loading Indicator */}
      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" style={{ marginTop: 20 }} />
      ) : (
        <MapView
          style={styles.map}
          mapType={mapType}
          region={{
            latitude: location ? location.latitude : defaultLocation.latitude,
            longitude: location ? location.longitude : defaultLocation.longitude,
            latitudeDelta: 0.01, // Zoomed in closer
            longitudeDelta: 0.01,
          }}
        >
          {location && <Marker coordinate={location} title="Your Location" />}
          {homeLocation && <Marker coordinate={homeLocation} pinColor="blue" title="Home" />}
          {workLocation && <Marker coordinate={workLocation} pinColor="purple" title="Work" />}
        </MapView>
      )}

      {/* Recent Locations */}
      <FlatList
        data={recentLocations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style={styles.recentText}>📍 {item.latitude.toFixed(4)}, {item.longitude.toFixed(4)}</Text>
        )}
      />

      {/* Buttons */}
      <TouchableOpacity style={styles.button} onPress={() => setMapType(mapType === "standard" ? "satellite" : "standard")}>
        <Text style={styles.buttonText}>Switch to {mapType === "standard" ? "Satellite" : "Standard"} View</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("navigation")}>
        <Text style={styles.buttonText}>Step-free Routes</Text>
      </TouchableOpacity>

      {/* New "View Saved Locations" Button */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("savedPlaces")}>
        <Text style={styles.buttonText}>View Saved Locations</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  searchBar: { height: 45, borderRadius: 8, borderWidth: 1, paddingLeft: 10, marginBottom: 10 },
  quickAccess: { flexDirection: "row", justifyContent: "space-around", marginBottom: 10 },
  quickButton: { backgroundColor: "#ddd", padding: 8, borderRadius: 5 },
  map: { width: "100%", height: 350, marginBottom: 10 }, // Increased height to take more screen space
  recentText: { fontSize: 14, color: "#555", marginTop: 5 },
  button: { 
    backgroundColor: "#4CAF50", 
    paddingVertical: 8,  // Reduced vertical padding 
    paddingHorizontal: 12,  // Adjusted horizontal padding
    borderRadius: 5, 
    marginTop: 10, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 14,  // Reduced font size for smaller buttons
  },
});
export default HomeScreen;
