import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons, FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons";

const MenuScreen = ({ navigation }: any) => {
  return (
    <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
      <View style={styles.overlay}>
        {/* Side Menu */}
        <View style={styles.menu}>
          {/* Close Button */}
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>

          {/* App Title */}
          <Text style={styles.title}>TransitEase</Text>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
              source={{ uri: "https://via.placeholder.com/50" }} // Replace with actual profile image URL
              style={styles.profileImage}
            />
            <View>
              <Text style={styles.greeting}>Hey John!</Text>
              <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate("Profile")}>
                <Text style={styles.profileText}>View Profile</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Menu Items */}
          <TouchableOpacity style={styles.menuItem}>
            <FontAwesome5 name="calendar-alt" size={20} color="black" />
            <Text style={styles.menuText}>Schedule your plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="clock" size={20} color="black" />
            <Text style={styles.menuText}>Recent Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("savedPlaces")}>
            <FontAwesome5 name="bookmark" size={20} color="black" />
            <Text style={styles.menuText}>Saved Places</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("settings")}>
            <Ionicons name="settings-sharp" size={20} color="black" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="help-outline" size={22} color="black" />
            <Text style={styles.menuText}>Help and feedback</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Dark transparent background
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  menu: {
    width: "100%", // 80% of screen width
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    elevation: 5, // Shadow effect for Android
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 70,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 32,
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  profileButton: {
    backgroundColor: 'rgba(108, 108, 108, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderRadius: 10,
    marginTop: 5,
    width: 104,
    height: 32,
  },
  profileText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#4A90E2",
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 10,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  menuText: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default MenuScreen;
