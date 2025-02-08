import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const SavedScreen = ({ navigation }: any) => {
  return (
    <View style={styles.container}>
      {/* Header Section inside a White Background Container */}
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          {/* Back Button */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>

          {/* Title */}
          <Text style={styles.headerText}>Saved Places</Text>
        </View>
      </View>

      {/* Saved Places Options Container */}
      <View style={styles.savedContainer}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="home-outline" size={24} color="black" />
          <Text style={styles.menuText}>Add Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="briefcase-outline" size={24} color="black" />
          <Text style={styles.menuText}>Add Work</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="school-outline" size={24} color="black" />
          <Text style={styles.menuText}>Add School</Text>
        </TouchableOpacity>
      </View>

      {/* Add Another Place */}
      <View style={styles.addPlaceContainer}>
        <TouchableOpacity style={styles.addAnotherPlace}>
          <Ionicons name="add-circle-outline" size={24} color="red" />
          <Text style={[styles.menuText, { color: "red" }]}>Add Another Place</Text>
        </TouchableOpacity>
      </View>

      {/* Empty State Message */}
      <Text style={styles.emptyMessage}>You don't have any saved places yet</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FA" },
  headerContainer: {
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    position: "relative",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  savedContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 42,
    paddingVertical: 5,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  menuText: { fontSize: 16, marginLeft: 10 },
  addPlaceContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    marginTop: 32,
    paddingVertical: 5,
  },
  addAnotherPlace: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  emptyMessage: { textAlign: "center", marginTop: 20, color: "#999" },
});

export default SavedScreen;
