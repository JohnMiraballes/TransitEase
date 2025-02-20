import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Dimensions, ScrollView, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Get screen width for full-width header
const screenWidth = Dimensions.get("window").width;

const SettingsScreen = ({ navigation }: any) => {
  const [isStepFree, setIsStepFree] = useState(false);

  // Function to reset app experience
  const resetFirstTime = async () => {
    try {
      await AsyncStorage.removeItem("isFirstTime");
      Alert.alert("Reset Successful", "The app will now show the Get Started screen on next launch.");
    } catch (error) {
      Alert.alert("Error", "Something went wrong while resetting.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Full Width */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Settings</Text>
        </View>
      </View>

      {/* Step-Free Routes Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionText}>Enable Step-Free Routes</Text>
        <Switch
          value={isStepFree}
          onValueChange={(value) => setIsStepFree(value)}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isStepFree ? "#4CAF50" : "#f4f3f4"}
        />
      </View>

      {/* Accounts Section */}
      <Text style={styles.sectionTitle}>Accounts</Text>
      <View style={styles.box}>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.boxText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.boxText}>Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* Help Centre Section */}
      <Text style={styles.sectionTitle}>Help Centre</Text>
      <View style={styles.box}>
        <TouchableOpacity style={styles.helpItem} onPress={() => Alert.alert("Customer Support Coming Soon!")}>
          <Ionicons name="headset-outline" size={25} color="black" />
          <Text style={styles.boxText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("Apps")}>
          <Ionicons name="apps-outline" size={25} color="black" />
          <Text style={styles.boxText}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("Instruction")}>
          <Ionicons name="document-text-outline" size={25} color="black" />
          <Text style={styles.boxText}>Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("About")}>
          <Ionicons name="location-outline" size={25} color="black" />
          <Text style={styles.boxText}>About Us</Text>
        </TouchableOpacity>
      </View>

      {/* Reset App Experience Button */}
      <TouchableOpacity style={styles.resetButton} onPress={resetFirstTime}>
        <Text style={styles.resetButtonText}>Reset App Experience</Text>
      </TouchableOpacity>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
    paddingHorizontal: 20,
  },
  headerContainer: {
    width: screenWidth, // Full width header
    backgroundColor: "#4CAF50", // Green header color
    paddingVertical: 20,
    alignSelf: "center",
    paddingHorizontal: 15,
    marginBottom: 42, // Slight shadow for depth
     // Rounded corners for header
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    fontSize: 30, // Larger font for readability
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
    color: "white", // White color for better contrast
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 10, // Ensures it is above other elements
    padding: 12, // Larger tap area for back button
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 20, // Increased padding for better spacing
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 12, // More spacing between sections
  },
  sectionText: {
    fontSize: 18, // Larger text for readability
  },
  sectionTitle: {
    fontSize: 20, // Larger title for clarity
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  box: {
    backgroundColor: "white",
    padding: 20, // Increased padding for larger tap area
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  boxText: {
    fontSize: 18, // Larger font for better readability
    marginVertical: 10, // Increased space between items
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10, // More padding for easier tapping
    gap: 12,
  },
  resetButton: {
    backgroundColor: "#FF5252", // Red color for warning
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  resetButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;