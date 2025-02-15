import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const AboutScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    {/* Header with Back Button */}
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={28} color="white" />
      </TouchableOpacity>
      <Text style={styles.title}>About Us</Text>
    </View>

    {/* App Description */}
    <View style={styles.card}>
      <Text style={styles.description}>
        <Text style={styles.bold}>TransitEase</Text> is a mobile public transport navigation 
        app designed to assist elderly individuals and persons with disabilities. It provides 
        step-free routes, voice guidance, and accessibility-friendly features to make travel easier.
      </Text>
    </View>

    {/* Meet the Team Section */}
    <Text style={styles.sectionTitle}>Meet the Team</Text>
    <View style={styles.card}>
      <Text style={styles.teamHeading}>Developers:</Text>
      <Text style={styles.teamMember}>👨‍💻 John Paul B. Nape - Frontend/Backend</Text>
      <Text style={styles.teamMember}>🎨 John Angel D. Culubong - Frontend/UI</Text>
      <Text style={styles.teamMember}>📜 John L. Miraballes - Documentation</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F8FB", // Soft blue-gray background
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#4CAF50", // Green header
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  backButton: {
    position: "absolute",
    left: 20,
    padding: 10,
  },
  title: {
    flex: 1,
    fontSize: 26,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3, // Shadow for Android
  },
  description: {
    fontSize: 18,
    lineHeight: 26,
    textAlign: "justify",
    color: "#333",
  },
  bold: {
    fontWeight: "bold",
    color: "#388E3C", // Dark green
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginVertical: 15,
  },
  teamHeading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#388E3C",
  },
  teamMember: {
    fontSize: 18,
    color: "#555",
    marginBottom: 8,
  },
});

export default AboutScreen;
