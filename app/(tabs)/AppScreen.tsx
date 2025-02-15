import React from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Import icons for the back button

const AppsScreen = ({ navigation }: any) => {
  return (
    <ScrollView style={styles.container}>
      {/* Header Section with Back Button */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>App</Text>
      </View>

      {/* Purpose Section */}
      <View style={styles.purposeSection}>
        <Text style={styles.purposeTitle}>Purpose of This App</Text>
        <Text style={styles.purposeDescription}>
          TransitEase is a mobile application designed to assist elderly individuals and those with mobility challenges
          in navigating public transportation systems. The primary goal of this app is to provide accessibility features
          that make it easier for people to travel independently, ensuring their journey is comfortable and safe.
        </Text>
        
        <Text style={styles.purposeDescription}>
          This app offers a unique feature by displaying step-free routes that are designed for individuals who may have
          difficulty using stairs or navigating uneven surfaces. By filtering the best accessible routes in real-time, 
          TransitEase ensures that users can find the most suitable and convenient paths through bus stations, metro 
          stations, and other key transportation points.
        </Text>

        <Text style={styles.purposeDescription}>
          The app also includes built-in voice guidance and haptic feedback, making it easier for users to follow directions
          without needing to constantly check their phone screen. These features are particularly helpful for those with visual
          impairments or anyone who may benefit from auditory or tactile cues.
        </Text>

        <Text style={styles.purposeDescription}>
          In addition to these features, TransitEase supports high-contrast mode and large text for users who need additional
          visual assistance. The app is designed to be inclusive, catering to a variety of needs, ensuring that everyone can
          navigate the public transport system with confidence and ease.
        </Text>

        <Text style={styles.purposeDescription}>
          Ultimately, TransitEase strives to make public transport more accessible, not just for elderly individuals and people
          with disabilities, but for anyone who values convenience, independence, and safety while traveling. With TransitEase,
          users can expect a reliable and supportive tool to guide them on their journey.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25, // Increased padding for better spacing
    backgroundColor: "#f9f9f9",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25, // Increased margin for separation
    backgroundColor: "#4CAF50", // Green background color for the header
    paddingVertical: 15, // Vertical padding for header
    borderTopLeftRadius: 12, // Rounded corners for top of the header
    borderTopRightRadius: 12, // Rounded corners for top of the header
  },
  backButton: {
    padding: 15, // Larger tap area for back button
    position: "absolute",
    left: 0,
    zIndex: 1, // Ensures the button is clickable
  },
  title: {
    flex: 1, // Takes available space to center the title
    fontSize: 28, // Increased font size
    fontWeight: "bold",
    textAlign: "center",
    color: "white", // White color for title text for better contrast
  },
  purposeSection: {
    marginBottom: 30, // Space between Purpose section and other content
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 12, // Rounded corners for better aesthetics
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5, // Added elevation for Android shadow
  },
  purposeTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333", // Title color
  },
  purposeDescription: {
    fontSize: 18,
    color: "#666", // Light text color for description
    marginTop: 10,
  },
});

export default AppsScreen;
