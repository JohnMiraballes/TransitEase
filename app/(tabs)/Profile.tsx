import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ProfileScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header Section inside a White Background Container */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Back Button (Left) - Now Clickable */}
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Profile Title (Centered) */}
          <Text style={styles.headerText}>Profile</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://via.placeholder.com/100" }} // Replace with actual profile image
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>John Doe</Text>
      </View>

      {/* Profile Options (Account & Home/Work) */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity style={styles.option}>
          <Ionicons name="person-outline" size={20} color="black" />
          <Text style={styles.optionText}>Account and login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("savedPlaces")}>
          <Ionicons name="briefcase-outline" size={20} color="black" />
          <Text style={styles.optionText}>Home and work</Text>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.option} onPress={() => navigation.navigate("settings")}>
          <Ionicons name="settings-outline" size={20} color="black" />
          <Text style={styles.optionText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F8F8",
  },
  headerContainer: {
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "white",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1, // Ensures it stays centered
  },
  backButton: {
    position: "absolute",
    left: 15,
    zIndex: 10, // Ensures it is above other elements
    padding: 10, // Adds a better touch area
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
  },
  optionsContainer: {
    marginTop: 73,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
  },
  settingsContainer: {
    marginTop: 23,
    backgroundColor: "white",
    borderRadius: 10,
    paddingVertical: 10,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProfileScreen;
