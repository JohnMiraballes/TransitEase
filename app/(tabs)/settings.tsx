import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// Get screen width for full-width header
const screenWidth = Dimensions.get("window").width;

const SettingsScreen = ({ navigation }: any) => {
  const [isStepFree, setIsStepFree] = useState(false);

  return (
    <View style={styles.container}>
      {/* Header Section with Full Width */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerText}>Setting</Text>
        </View>
      </View>

      {/* Step-Free Routes Toggle */}
      <View style={styles.section}>
        <Text style={styles.sectionText}>Enable Step-Free Routes</Text>
        <Switch
          value={isStepFree}
          onValueChange={(value) => setIsStepFree(value)}
        />
      </View>

      {/* Accounts Section */}
      <Text style={styles.sectionTitle}>Accounts</Text>
      <View style={styles.box}>
        <TouchableOpacity>
          <Text style={styles.boxText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.boxText}>Sign up</Text>
        </TouchableOpacity>
      </View>

      {/* Help Centre Section */}
      <Text style={styles.sectionTitle}>Help Centre</Text>
      <View style={styles.box}>
        <TouchableOpacity style={styles.helpItem}>
          <Ionicons name="headset-outline" size={20} color="black" />
          <Text style={styles.boxText}>Support</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("apps")}>
          <Ionicons name="apps-outline" size={20} color="black" />
          <Text style={styles.boxText}>Apps</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("instruction")}>
          <Ionicons name="document-text-outline" size={20} color="black" />
          <Text style={styles.boxText}>Instructions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.helpItem} onPress={() => navigation.navigate("about")}>
          <Ionicons name="location-outline" size={20} color="black" />
          <Text style={styles.boxText}>About Us</Text>
        </TouchableOpacity>
      </View>
    </View>
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
    backgroundColor: "white",
    paddingVertical: 15,
    alignSelf: "center",
    paddingHorizontal: 15,
    marginBottom: 42, // Slight shadow for depth
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  backButton: {
    position: "absolute",
    left: 0,
    zIndex: 10, // Ensures it is above other elements
    padding: 10, // Adds a better touch area
  },
  section: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    marginVertical: 10,
  },
  sectionText: {
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 15,
    marginBottom: 5,
  },
  box: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  boxText: {
    fontSize: 16,
    marginVertical: 5,
  },
  helpItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 5,
    gap: 12,
  },
});

export default SettingsScreen;
