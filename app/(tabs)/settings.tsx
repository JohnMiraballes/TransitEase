import React, { useState } from "react";
import { View, Text, StyleSheet, Switch, Button, TouchableOpacity } from "react-native";

const SettingsScreen = ({ navigation }: any) => {
  const [isStepFree, setIsStepFree] = useState(false);

  const toggleStepFree = () => setIsStepFree((prev) => !prev);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      {/* Step-Free Routes Toggle */}
      <View style={styles.settingItem}>
        <Text>Enable Step-Free Routes</Text>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  settingItem: {
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  optionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginVertical: 10,
  },
  optionText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default SettingsScreen;
