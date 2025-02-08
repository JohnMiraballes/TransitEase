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
import { Ionicons } from "@expo/vector-icons";

// Define types for navigation
type RootStackParamList = {
  Home: undefined;
  navigation: undefined;
  savedPlaces: undefined;
  settings: undefined;
  Menu: undefined;  // ✅ Add this line
};


type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = { navigation: HomeScreenNavigationProp };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [homeLocation, setHomeLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [workLocation, setWorkLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);

  // Default location: Manila, Philippines
  const defaultLocation = { latitude: 14.5995, longitude: 120.9842 };

  // Load saved locations
  useEffect(() => {
    const loadSavedLocations = async () => {
      try {
        const home = await AsyncStorage.getItem("homeLocation");
        const work = await AsyncStorage.getItem("workLocation");

        if (home) setHomeLocation(JSON.parse(home));
        if (work) setWorkLocation(JSON.parse(work));
      } catch (error) {
        console.error("Error loading saved locations:", error);
      }
    };

    loadSavedLocations();
  }, []);

  // Get user’s current location
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is needed for maps to work.");
        setLocation(defaultLocation);
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  // Save Home or Work location
  const saveLocation = async (type: "home" | "work") => {
    if (!location) return;

    try {
      await AsyncStorage.setItem(`${type}Location`, JSON.stringify(location));
      if (type === "home") setHomeLocation(location);
      else setWorkLocation(location);

      Alert.alert("Saved!", `${type.charAt(0).toUpperCase() + type.slice(1)} location saved successfully.`);
    } catch (error) {
      console.error("Error saving location:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Hamburger Menu */}
      <TouchableOpacity style={styles.hamburger} onPress={() => navigation.navigate("Menu")}>
        <Ionicons name="menu" size={28} color="black" />
      </TouchableOpacity>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={{
              latitude: location ? location.latitude : defaultLocation.latitude,
              longitude: location ? location.longitude : defaultLocation.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {/* Auto Pin at User's Location */}
            {location && <Marker coordinate={location} title="Your Location" pinColor="red" />}
            {/* Home and Work Pins */}
            {homeLocation && <Marker coordinate={homeLocation} pinColor="blue" title="Home" />}
            {workLocation && <Marker coordinate={workLocation} pinColor="purple" title="Work" />}
          </MapView>
        )}
      </View>

      {/* Bottom UI */}
      <View style={styles.bottomSheet}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Where to?"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccess}>
          <TouchableOpacity style={styles.quickButton} onPress={() => saveLocation("home")}>
            <Text style={styles.buttonText}>🏠 Home</Text>
            <Text style={styles.subText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => saveLocation("work")}>
            <Text style={styles.buttonText}>🏢 Work</Text>
            <Text style={styles.subText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Feature Coming Soon!")}>
            <Text style={styles.buttonText}>➕ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Locations */}
        <FlatList
          data={[
            { name: "Pamantasan ng Cabuyao", address: "Cabuyao, Laguna" }, // Example data
            { name: "SM City Santa Rosa", address: "Santa Rosa, Laguna" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recentItem}>
              <Text style={styles.recentText}>{item.name}</Text>
              <Text style={styles.recentSubText}>{item.address}</Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  mapContainer: { flex: 1, position: "relative" },
  hamburger: {
    position: "absolute",
    top: 50,
    left: 20,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
    zIndex: 10,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "35%",
  },
  searchBarContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  searchBar: { flex: 1, fontSize: 16, color: "#333" },
  quickAccess: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
  quickButton: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "30%",
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  subText: { fontSize: 12, color: "#666" },
  recentItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  recentText: { fontSize: 16, fontWeight: "bold" },
  recentSubText: { fontSize: 12, color: "#777" },
});

export default HomeScreen;
