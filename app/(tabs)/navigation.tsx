import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons"; // For the disability icon

// Define the navigation prop types
type RootStackParamList = {
  home: undefined;
  navigation: undefined;
  settings: undefined;
  about: undefined;
};

type NavigationScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "navigation">;

type NavigationScreenProps = {
  navigation: NavigationScreenNavigationProp;
};

const NavigationScreen = ({ navigation }: NavigationScreenProps) => {
  const [stepFreeRouteAvailable, setStepFreeRouteAvailable] = useState(false);
  const [accessibleLocations, setAccessibleLocations] = useState<string[]>([]);
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);
  const [stepFreeRoute, setStepFreeRoute] = useState<{ latitude: number; longitude: number } | null>(null);

  // Request location permission
  const requestLocationPermission = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status === "granted") {
      setHasLocationPermission(true);
      let location = await Location.getCurrentPositionAsync({});
      setUserLocation(location.coords);
    } else {
      Alert.alert("Permission Denied", "Please enable location access.");
    }
  };

  // Simulate finding step-free route in real-time (Replace with actual API)
  const handleStepFreeRoute = async () => {
    if (!userLocation) {
      Alert.alert("Location Required", "Please enable location services.");
      return;
    }

    try {
      // Example: Making an API call to get accessible step-free routes (This is a placeholder)
      const response = await fetch(`https://api.example.com/step-free-routes?lat=${userLocation.latitude}&lng=${userLocation.longitude}`);
      const data = await response.json();

      if (data && data.routes && data.routes.length > 0) {
        setStepFreeRouteAvailable(true);
        setStepFreeRoute(data.routes[0]); // Assuming the first route is step-free
        Alert.alert("Step-Free Route", "A step-free route is available near you!");
      } else {
        setStepFreeRouteAvailable(false);
        Alert.alert("No Step-Free Routes", "No step-free routes are available at the moment.");
      }
    } catch (error) {
      console.error("Error fetching step-free route:", error);
      Alert.alert("Error", "Unable to fetch step-free routes. Please try again later.");
    }
  };

  // Function to show accessible locations
  const handleAccessibleLocations = () => {
    fetchAccessibleLocations();
  };

  // Mocking API call to get accessible locations
  const fetchAccessibleLocations = async () => {
    try {
      const response = await fetch('https://api.example.com/accessible-locations');
      const data = await response.json();

      if (data && data.locations) {
        setAccessibleLocations(data.locations);
        Alert.alert("Accessible Locations", "Here are some accessible locations near you.");
      } else {
        setAccessibleLocations([]);
        Alert.alert("No Locations Found", "No accessible locations are available at the moment.");
      }
    } catch (error) {
      console.error("Error fetching accessible locations:", error);
      Alert.alert("Error", "Unable to fetch accessible locations. Please try again later.");
    }
  };

  // Request location permission on component mount
  useEffect(() => {
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Navigation</Text>

      {/* Button for step-free route */}
      <TouchableOpacity style={styles.button} onPress={handleStepFreeRoute}>
        <Text style={styles.buttonText}>
          {stepFreeRouteAvailable ? "Step-Free Route Found!" : "Find Step-Free Route"}
        </Text>
      </TouchableOpacity>

      {/* Button for accessible locations */}
      <TouchableOpacity style={styles.button} onPress={handleAccessibleLocations}>
        <Text style={styles.buttonText}>
          {accessibleLocations.length > 0 ? "Accessible Locations Found" : "Show Accessible Locations"}
        </Text>
      </TouchableOpacity>

      {/* Button for navigating back to Home */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("home")}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>

      {/* MapView */}
      {userLocation && (
        <MapView
          style={styles.map}
          region={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* Marker for the user's current location */}
          <Marker coordinate={userLocation} title="You" description="Your current location" />

          {/* Marker for the step-free route */}
          {stepFreeRoute && (
            <Marker 
            coordinate={stepFreeRoute} 
            title="Step-Free Route" 
            description="Accessible step-free route"
            >
              <Ionicons name="accessibility" size={40} color="blue" />
              
            </Marker>
          )}
        </MapView>
      )}

      {/* Display a list of accessible locations if found */}
      {accessibleLocations.length > 0 && (
        <View style={styles.locationsContainer}>
          <Text style={styles.locationsTitle}>Accessible Locations:</Text>
          {accessibleLocations.map((location, index) => (
            <Text key={index} style={styles.locationText}>
              {location}
            </Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
    marginTop: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginTop: 30,
    marginBottom: 30,
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    backgroundColor: "#4CAF50",
    marginVertical: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 0,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
  map: {
    width: "100%",
    height: 350,
    marginTop: 10,
    borderRadius: 10,
  },
  locationsContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  locationsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  locationText: {
    fontSize: 16,
    color: "#555",
  },
});

export default NavigationScreen;
