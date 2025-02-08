import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons for the back button

const AboutScreen = ({ navigation }: any) => (
  <ScrollView style={styles.container}>
    {/* Header with Back Button */}
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>About Us</Text>
    </View>

    {/* App Description */}
    <Text style={styles.description}>
      Transit Made Easy is a mobile public transport navigation app designed
      to assist elderly individuals and persons with disabilities.
    </Text>

    {/* Meet the Team Section */}
    <Text style={styles.title}>Meet the Team</Text>
    <Text style={styles.teamHeading}>Developers:</Text>
    <Text style={styles.teamMember}>John Paul B. Nape - Frontend/Backend</Text>
    <Text style={styles.teamMember}>John Angel D. Culubong - Frontend/UI</Text>
    <Text style={styles.teamMember}>John L. Miraballes - Documentation</Text>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
    position: "relative",
  },
  backButton: {
    position: "absolute",
    left: 0,
    padding: 10,
    zIndex: 1, // Ensures button stays above text
  },
  title: {
    flex: 1, // Makes the title take available space for proper centering
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "justify",
  },
  teamHeading: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 5,
  },
  teamMember: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default AboutScreen;
