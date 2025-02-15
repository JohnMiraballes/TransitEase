import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons for the back button

const InstructionScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    {/* Header Section with Back Button */}
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>How to Use the App</Text>
    </View>

    {/* Instructions for Home Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>To access the quick access buttons</Text>
      <Image source={require("../../assets/images/Quick.png")} style={styles.image} />
      <Text>1. On the Home screen, you can view the main features of the app.</Text>
      <Text>2. To access the quick access buttons and step free routes click the arrow.</Text>
    </View>

    {/* Instructions for Navigation Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>To use the Step-Free Routes feature</Text>
      <Image source={require("../../assets/images/Navigation.png")} style={styles.image} />
      <Text>1. On the "Navigation" screen, you can find step-free routes suitable for elderly users or those with disabilities.</Text>
      <Text>2. You can also view nearby accessible locations (e.g., public transport stations, shopping centers, etc.).</Text>
      <Text>3. Click first the location suggest then use the "Go now" button to get a route free of stairs or other obstacles.</Text>
    </View>

    {/* Instructions for Map Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Map Screen</Text>
      <Image source={require("../../assets/images/Map.png")} style={styles.image} />
      <Text>1. The "Map" screen allows you to view your current location on a map.</Text>
      <Text>2. You can also find routes and landmarks relevant to your journey.</Text>
    </View>

    {/* Instructions for Settings Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>To access the settings</Text>
      <Image source={require("../../assets/images/Settings.png")} style={styles.image} />
      <Text>1. On the "Settings" screen, you can customize the app's preferences, such as language, notifications, and themes.</Text>
      <Text>2. You can access the app's help and feedback sections here.</Text>
    </View>

    {/* Instructions for Settings Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>To access the App, Instructions, etc.</Text>
      <Image source={require("../../assets/images/Sub-Settings.png")} style={styles.image} />
      <Text>1. On the "Settings" screen, you can customize the app's preferences, such as language, notifications, and themes.</Text>
      <Text>2. You can access the app's help and feedback sections here.</Text>
    </View>

    {/* Instructions for Apps Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Apps Screen</Text>
      <Image source={require("../../assets/images/App.png")} style={styles.image} />
      <Text>1. The "Apps" screen provides additional features or services integrated with the app.</Text>
      <Text>2. You can find helpful tools and links to other apps or services related to accessibility.</Text>
    </View>

    {/* Instructions for Team Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Team Screen</Text>
      <Image source={require("../../assets/images/Team.png")} style={styles.image} />
      <Text>1. The "Team" screen introduces the development team behind the app.</Text>
      <Text>2. You can find the team members' roles and contributions to the project.</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // Light background for the instructions
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green background for header
    paddingVertical: 15, // Padding for top and bottom
    paddingHorizontal: 20, // Padding for left and right
    borderTopLeftRadius: 15, // Optional: rounded corners for the top of the header
    borderTopRightRadius: 15, // Optional: rounded corners for the top of the header
  },
  backButton: {
    padding: 10,
    position: "absolute",
    left: 0,
    zIndex: 1, // Ensure the button is clickable
  },
  title: {
    flex: 1, // This makes the title take up all available space
    fontSize: 24,
    fontWeight: "bold",
    color: "white", // White text for better contrast on green background
    textAlign: "center",
  },
  section: {
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  image: {
    width: "100%", // Makes the image responsive
    height: 300, // Increased height for better visibility
    resizeMode: "contain", // Ensures the whole image is visible
    marginBottom: 15, // Adds some space below the image
  },
});

export default InstructionScreen;
