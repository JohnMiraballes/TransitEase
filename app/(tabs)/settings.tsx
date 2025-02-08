import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, TouchableOpacity } from "react-native";

const SettingsScreen = ({ navigation }: any) => {
  const [isStepFree, setIsStepFree] = useState(false);

  const toggleStepFree = () => setIsStepFree((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Step-Free Routes Toggle */}
      <View style={styles.settingCard}>
        <Text style={styles.settingTitle}>Enable Step-Free Routes</Text>
        <Switch value={isStepFree} onValueChange={toggleStepFree} />
      </View>

      {/* Navigate to Apps */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("apps")}
      >
        <Text style={styles.optionText}>Apps</Text>
      </TouchableOpacity>

      {/* Navigate to Instructions */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("instruction")}
      >
        <Text style={styles.optionText}>Instructions</Text>
      </TouchableOpacity>

      {/* Navigate to About Screen (Nested inside Settings) */}
      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("about")}
      >
        <Text style={styles.optionText}>About</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginVertical: 30,
    color: "#4CAF50",
  },
  settingCard: {
    width: "100%",
    padding: 20,
    marginVertical: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  optionText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
