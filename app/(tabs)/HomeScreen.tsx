import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert,
  Animated,
  PanResponder,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";


type RootStackParamList = { Home: undefined; Menu: undefined; Navigation: undefined };
type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "Home">;
type HomeScreenProps = { 
  navigation: HomeScreenNavigationProp;
  setIsLoggedIn: Dispatch<SetStateAction<boolean | null>>;
 };

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [homeLocation, setHomeLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [workLocation, setWorkLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [loading, setLoading] = useState(true);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);
  const bottomSheetAnim = useRef(new Animated.Value(500)).current;

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

  useEffect(() => {
    const backAction = () => {
      if (navigation.isFocused()) {
        // Only exit if the user is on the Home Screen
        Alert.alert("Exit App", "Do you want to exit?", [
          { text: "Cancel", style: "cancel" },
          { text: "Exit", onPress: () => BackHandler.exitApp() },
        ]);
        return true;
      }
      return false; // Allow default back navigation
    };
  
    const backHandler = BackHandler.addEventListener("hardwareBackPress", backAction);
    return () => backHandler.remove();
  }, [navigation]);
  const toggleBottomSheet = (forceClose = false) => {
    Animated.timing(bottomSheetAnim, {
      toValue: forceClose ? 500 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setBottomSheetOpen(!forceClose);
  };

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        if (gesture.dy > 0) {
          bottomSheetAnim.setValue(gesture.dy);
        }
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dy > 100) {
          toggleBottomSheet(true);
        } else {
          Animated.timing(bottomSheetAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }).start();
        }
      },
    })
  ).current;

  return (
    <View style={styles.container}>
      {!bottomSheetOpen && (
        <TouchableOpacity style={styles.hamburger} onPress={() => navigation.navigate("Menu")}>
          <Ionicons name="menu" size={28} color="black" />
        </TouchableOpacity>
      )}

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

      <Animated.View
        {...panResponder.panHandlers}
        style={[styles.bottomSheet, { transform: [{ translateY: bottomSheetAnim }] }]}
      >
        <View style={styles.dragHandle} />

        <View style={styles.searchBarContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchBar}
            placeholder="Where to?"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={() => toggleBottomSheet(false)}
          />
          <TouchableOpacity onPress={() => Alert.alert("Voice Search Coming Soon!")}>
            <Ionicons name="mic" size={20} color="gray" style={styles.micIcon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.stepFreeButton} onPress={() => navigation.navigate("Navigation")}>
          <Text style={styles.stepFreeText}>🚶‍♂️ Step-Free Route</Text>
        </TouchableOpacity>

        <View style={styles.quickAccess}>
  <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Set Home Location")}>
    <View style={styles.quickIconWrapper}>
      <Ionicons name="home" size={28} color="#007AFF" />
    </View>
    <Text style={styles.quickText}>Home</Text>
    <Text style={styles.quickSubText}>Add</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Set Work Location")}>
    <View style={styles.quickIconWrapper}>
      <Ionicons name="briefcase" size={28} color="#007AFF" />
    </View>
    <Text style={styles.quickText}>Work</Text>
    <Text style={styles.quickSubText}>Add</Text>
  </TouchableOpacity>

  <TouchableOpacity style={styles.quickButton} onPress={() => Alert.alert("Feature Coming Soon!")}>
    <View style={styles.quickIconWrapper}>
      <Ionicons name="add" size={28} color="#007AFF" />
    </View>
    <Text style={styles.quickText}>Add</Text>
    <Text style={styles.quickSubText}> </Text> {/* Keeps alignment consistent */}
  </TouchableOpacity>
</View>



       
          <Text style={styles.recentHeader}>Recent</Text>

        <FlatList
          data={[
            { name: "Pamantasan ng Cabuyao", address: "Cabuyao, Laguna", icon: "time-outline" },
            { name: "SM City Santa Rosa", address: "Santa Rosa, Laguna", icon: "time-outline" },
          ]}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.recentItem}>
              <Ionicons name={item.icon as keyof typeof Ionicons.glyphMap} size={20} color="#333" style={styles.recentItemIcon} />
              <View>
                <Text style={styles.recentText}>{item.name}</Text>
                <Text style={styles.recentSubText}>{item.address}</Text>
              </View>
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
    zIndex: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 50,
  },
  bottomSheet: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: "85%",
  },
  dragHandle: {
    width: 60,
    height: 3,
    backgroundColor: "#ccc",
    borderRadius: 3,
    alignSelf: "center",
    marginBottom: 13,
  },
  searchBarContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  quickAccess: {
    flexDirection: "row",
    justifyContent: "space-evenly", // ✅ Evenly spaces all buttons
    alignItems: "center",
    marginBottom: 15,
  },
  
  quickButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 80, // ✅ Ensures all buttons have equal width
  },
  
  quickIconWrapper: {
    width: 60, // ✅ Ensures uniform circle size
    height: 60,
    borderRadius: 30,
    backgroundColor: "#f2f2f2",
    alignItems: "center",
    justifyContent: "center",
  },
  
  quickText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#000",
    textAlign: "center",
    marginTop: 5, // ✅ Adds space between icon and text
  },
  
  quickSubText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    marginTop: 2, // ✅ Ensures uniform spacing
  },
  
  
  searchIcon: { marginRight: 10 },
  searchBar: { flex: 1, fontSize: 16, color: "#333" },
  micIcon: { marginLeft: 10 },
  stepFreeButton: { backgroundColor: "#007AFF", padding: 12, borderRadius: 20, alignItems: "center", marginBottom: 15 },
  stepFreeText: { color: "#fff", fontWeight: "bold" },
  buttonText: { fontSize: 14 },
  
  // ✅ Added styles for the missing properties
  recentHeaderContainer: { flexDirection: "row", alignItems: "center", marginBottom: 10 },
  recentIcon: { marginRight: 5 }, // Fix for missing `recentIcon`
  recentHeader: { fontSize: 16, fontWeight: "bold", color: "#333" }, // Fix for missing `recentHeader`
  
  recentItem: { 
    flexDirection: "row", 
    alignItems: "center", 
    paddingVertical: 10, 
    borderBottomWidth: 1, 
    borderBottomColor: "#ddd" 
  },
  recentItemIcon: { marginRight: 10 },
  recentText: { fontWeight: "bold" },
  recentSubText: { color: "#666" },
});


export default HomeScreen;