import React, { useState, useEffect } from "react";
import { 
  View, Text, StyleSheet, TouchableOpacity, FlatList, ActivityIndicator, ScrollView 
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

const AccessibilityScreen = ({ navigation }: any) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  
  type IoniconName = "walk" | "trail-sign";

  const stepFreeRoutes: { 
    id: string; 
    name: string; 
    description: string; 
    coordinates: { latitude: number; longitude: number }; 
    icon: IoniconName;
  }[] = [
    {
      id: "1",
      name: "Main Street Pathway",
      description: "Ramps, elevators, and resting spots available.",
      coordinates: { latitude: 14.55, longitude: 120.99 },
      icon: "walk",
    },
    {
      id: "2",
      name: "City Plaza Walkway",
      description: "Step-free access with tactile paving for visually impaired users.",
      coordinates: { latitude: 14.56, longitude: 121.0 },
      icon: "trail-sign",
    }
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

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>Accessible Routes</Text>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="#4CAF50" />
        ) : (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location ? location.latitude : defaultLocation.latitude,
              longitude: location ? location.longitude : defaultLocation.longitude,
              latitudeDelta: 0.06,
              longitudeDelta: 0.06,
            }}
          >
            {/* Step-Free Routes Markers */}
            {stepFreeRoutes.map((route) => (
              <Marker key={route.id} coordinate={route.coordinates}>
                <View style={styles.marker}>
                  <Ionicons name={route.icon} size={24} color="white" />
                </View>
                <Callout>
                  <Text style={{ fontWeight: "bold" }}>{route.name}</Text>
                  <Text>{route.description}</Text>
                </Callout>
              </Marker>
            ))}

            {/* User Location Marker */}
            {location && (
              <Marker coordinate={location} title="Your Location">
                <Ionicons name="location-sharp" size={30} color="blue" />
              </Marker>
            )}
          </MapView>
        )}
      </View>

      {/* Route List */}
      <ScrollView style={styles.listContainer}>
        <FlatList
          data={stepFreeRoutes}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.routeContainer}>
              <Ionicons name={item.icon} size={20} color="#388E3C" style={{ marginRight: 10 }} />
              <View>
                <Text style={styles.routeText}>{item.name}</Text>
                <Text style={styles.descriptionText}>{item.description}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false} // Prevents conflicts with ScrollView
        />
      </ScrollView>

      {/* Emergency Assistance Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Emergency Assistance</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    position: "absolute",
    left: 20,
    zIndex: 1,
  },
  title: {
    flex: 1,
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },

  mapContainer: {
    width: "100%",
    height: 250,
    marginVertical: 10,
    borderRadius: 10,
    overflow: "hidden",
  },
  map: {
    width: "100%",
    height: "100%",
  },

  listContainer: { flex: 1, paddingHorizontal: 10, marginBottom: 10 },

  routeContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginVertical: 6,
    borderRadius: 10,
    backgroundColor: "#E8F5E9",
    borderWidth: 1,
    borderColor: "#D0F1D7",
  },
  routeText: { fontSize: 16, fontWeight: "bold", color: "#388E3C" },
  descriptionText: { fontSize: 14, color: "#555" },

  marker: {
    backgroundColor: "#4CAF50",
    padding: 6,
    borderRadius: 10,
    borderColor: "white",
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  button: {
    backgroundColor: "#E53935",
    padding: 12,
    borderRadius: 10,
    margin: 10,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
});

export default AccessibilityScreen;
