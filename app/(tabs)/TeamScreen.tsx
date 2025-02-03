// TeamScreen.tsx
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TeamScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meet the Team</Text>
      
      <View style={styles.teamMember}>
        <Text style={styles.memberName}>John Doe</Text>
        <Text style={styles.memberRole}>Project Lead</Text>
        <Text style={styles.memberDescription}>
          John is the lead developer and responsible for overseeing the project.
        </Text>
      </View>

      <View style={styles.teamMember}>
        <Text style={styles.memberName}>Jane Smith</Text>
        <Text style={styles.memberRole}>UI/UX Designer</Text>
        <Text style={styles.memberDescription}>
          Jane is responsible for designing the user interface and ensuring a smooth user experience.
        </Text>
      </View>

      <View style={styles.teamMember}>
        <Text style={styles.memberName}>Samuel Johnson</Text>
        <Text style={styles.memberRole}>Backend Developer</Text>
        <Text style={styles.memberDescription}>
          Samuel works on the backend, including database management and API development.
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
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  teamMember: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  memberName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  memberRole: {
    fontSize: 16,
    fontStyle: "italic",
    marginVertical: 5,
  },
  memberDescription: {
    fontSize: 16,
    color: "#555",
  },
});

export default TeamScreen;
