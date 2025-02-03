import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const InstructionScreen = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>How to Use the App</Text>

    {/* Instructions for Home Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Home Screen</Text>
      <Text>
        1. On the Home screen, you can view the main features of the app.
      </Text>
      <Text>
        2. You can access settings and navigate to other sections from here.
      </Text>
    </View>

    {/* Instructions for Navigation Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Navigation Screen</Text>
      <Text>
        1. On the "Navigation" screen, you can find step-free routes suitable for elderly users or those with disabilities.
      </Text>
      <Text>
        2. You can also view nearby accessible locations (e.g., public transport stations, shopping centers, etc.).
      </Text>
      <Text>
        3. Use the "Find Step-Free Route" button to get a route free of stairs or other obstacles.
      </Text>
    </View>

    {/* Instructions for Map Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Map Screen</Text>
      <Text>
        1. The "Map" screen allows you to view your current location on a map.
      </Text>
      <Text>
        2. You can also find routes and landmarks relevant to your journey.
      </Text>
    </View>

    {/* Instructions for About Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>About Screen</Text>
      <Text>
        1. The "About" screen provides information about the app, including its purpose and features.
      </Text>
      <Text>
        2. You can learn about the team behind the app and how it was developed.
      </Text>
    </View>

    {/* Instructions for Settings Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Settings Screen</Text>
      <Text>
        1. On the "Settings" screen, you can customize the app's preferences, such as language, notifications, and themes.
      </Text>
      <Text>
        2. You can access the app's help and feedback sections here.
      </Text>
    </View>

    {/* Instructions for Apps Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Apps Screen</Text>
      <Text>
        1. The "Apps" screen provides additional features or services integrated with the app.
      </Text>
      <Text>
        2. You can find helpful tools and links to other apps or services related to accessibility.
      </Text>
    </View>

    {/* Instructions for Team Screen */}
    <View style={styles.section}>
      <Text style={styles.heading}>Team Screen</Text>
      <Text>
        1. The "Team" screen introduces the development team behind the app.
      </Text>
      <Text>
        2. You can find the team members' roles and contributions to the project.
      </Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f0f0f0", // Light background for the instructions
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
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
});

export default InstructionScreen;
