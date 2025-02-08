// AppsScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons for the back button

const AppsScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Apps Used</Text>
      </View>

      {/* Apps List */}
      <View style={styles.appItem}>
        <Text style={styles.appName}>React Native</Text>
        <Text style={styles.appDescription}>
          A framework for building native apps using React.
        </Text>
      </View>

      <View style={styles.appItem}>
        <Text style={styles.appName}>Expo</Text>
        <Text style={styles.appDescription}>
          A platform for building and deploying React Native apps with ease.
        </Text>
      </View>

      <View style={styles.appItem}>
        <Text style={styles.appName}>React Navigation</Text>
        <Text style={styles.appDescription}>
          A routing and navigation library for React Native.
        </Text>
      </View>

      <View style={styles.appItem}>
        <Text style={styles.appName}>React Native Maps</Text>
        <Text style={styles.appDescription}>
          A library for displaying maps in React Native apps.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
    position: "absolute",
    left: 0,
    zIndex: 1, // Ensures the button is clickable
  },
  title: {
    flex: 1, // Takes available space to center the title
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  appItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  appDescription: {
    fontSize: 16,
    color: "#555",
  },
});

export default AppsScreen;
