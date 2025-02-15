import React, { useState, useEffect } from "react";
import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity, FlatList, 
  ActivityIndicator, Alert, Animated 
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type RootStackParamList = { Home: undefined; Menu: undefined; navigation: undefined};
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = { navigation: HomeScreenNavigationProp; };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [homeLocation, setHomeLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [workLocation, setWorkLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const [bottomSheetAnim] = useState(new Animated.Value(0));

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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location access is needed for maps to work.");
        setLocation({ latitude: 14.5995, longitude: 120.9842 });
        setLoading(false);
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation.coords);
      setLoading(false);
    })();
  }, []);

  // Animation Logic
  const toggleBottomSheet = () => {
    Animated.timing(bottomSheetAnim, {
      toValue: bottomSheetOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setBottomSheetOpen(!bottomSheetOpen);
  };

  const bottomSheetTranslateY = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [500, 0], // Moves from off-screen (500px down) to fully visible
  });

  const overlayOpacity = bottomSheetAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.5], // Creates a dimmed background effect when open
  });

  return (
    <View style={styles.container}>
      {/* Hamburger Menu */}
      {!bottomSheetOpen && (
        <TouchableOpacity style={styles.hamburger} onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
      )}

      {/* Map Section */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <MapView
            style={StyleSheet.absoluteFillObject}
            region={{
              latitude: location ? location.latitude : 14.5995,
              longitude: location ? location.longitude : 120.9842,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            {location && <Marker coordinate={location} title="Your Location" pinColor="red" />}
            {homeLocation && <Marker coordinate={homeLocation} pinColor="blue" title="Home" />}
            {workLocation && <Marker coordinate={workLocation} pinColor="purple" title="Work" />}
          </MapView>
        )}
      </View>

      {/* Overlay (Appears when Bottom Sheet is open) */}
      {bottomSheetOpen && <Animated.View style={[styles.overlay, { opacity: overlayOpacity }]} />}

      {/* Bottom Sheet */}
      <Animated.View style={[styles.bottomSheet, { transform: [{ translateY: bottomSheetTranslateY }] }]}>
        {/* Toggle Arrow */}
        <TouchableOpacity style={styles.arrowContainer} onPress={toggleBottomSheet}>
          <Ionicons name={bottomSheetOpen ? "chevron-down" : "chevron-up"} size={24} color="black" />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchBar}
            placeholder="Where to?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => !bottomSheetOpen && toggleBottomSheet()} // Expands when tapped
          />
        </View>
        <TouchableOpacity 
          style={styles.stepFreeButton} 
          onPress={() => navigation.navigate("navigation")} // Navigate to Navigation Screen
        >
          <Text style={styles.stepFreeText}>🚶‍♂️ Step-Free Route</Text>
        </TouchableOpacity>

        {/* Quick Access Buttons */}
        <View style={styles.quickAccess}>
          <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Set Home Location")}>
            <Text style={styles.buttonText}>🏠 Home</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Set Work Location")}>
            <Text style={styles.buttonText}>🏢 Work</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Feature Coming Soon!")}>
            <Text style={styles.buttonText}>➕ Add</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Locations */}
        <FlatList
          data={[
            { name: "Pamantasan ng Cabuyao", address: "Cabuyao, Laguna" },
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
      </Animated.View>
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
    elevation: 5,
    zIndex: 10,
    borderWidth: 1,
  },
  bottomSheet: {
    backgroundColor: "#4CAF50", // Green color for bottom sheet
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "100%", // Covers the entire screen when expanded
    borderTopWidth: 2,  // Border for the top of the bottom sheet
    borderTopColor: "black", // Light gray color for the top border
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "black",
  },
  arrowContainer: {
    alignSelf: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 20,
    padding: 5,
    marginBottom: 10,
    borderWidth: 1,  // Border for the arrow container
    borderColor: "#ddd", // Light gray border color
  },
  stepFreeButton: {
    backgroundColor: "#fff", // Green color for visibility
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
    borderWidth: 1,  // Border for step-free button
    borderColor: "black", // Green color border
  },
  stepFreeText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
  searchBarContainer: { 
    backgroundColor: "#f2f2f2", 
    borderRadius: 10, 
    padding: 10, 
    marginBottom: 15, 
    borderWidth: 1,  // Border for the search bar container
    borderColor: "black", // Light gray border for separation
  },
  searchBar: { fontSize: 16, color: "#333" },
  quickAccess: { flexDirection: "row", justifyContent: "space-around", marginBottom: 15 },
  quickButton: {
    backgroundColor: "#f2f2f2", 
    padding: 10, 
    borderRadius: 10, 
    alignItems: "center", 
    width: "30%", 
    borderWidth: 1,  // Border for each quick button
    borderColor: "black", // Light gray border for separation
  },
  buttonText: { fontSize: 16, fontWeight: "bold" },
  recentItem: { 
    padding: 10, 
    backgroundColor: "#fff",  // White background for better contrast
    borderBottomWidth: 1, 
    borderBottomColor: "#ddd",  // Light gray border for subtle separation
    borderRadius: 10,  // Rounded corners for a softer look
    marginBottom: 10, // Space between items
    borderWidth: 1,  // Border for the entire recent item
    borderColor: "black",  // Light gray border color for all sides
  },
  recentText: { fontSize: 16, fontWeight: "bold" },
  recentSubText: { fontSize: 12, color: "#777" },
});

export default HomeScreen;
