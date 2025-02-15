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
            <Ionicons name="close" size={28} color="black" />
          </TouchableOpacity>

          {/* App Title */}
          <Text style={styles.title}>TransitEase</Text>

          {/* Profile Section */}
          <View style={styles.profileSection}>
            <Image
                      source={require("../../assets/images/download.jpg")} // Replace with your actual profile image path
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
            <FontAwesome5 name="calendar-alt" size={22} color="black" />
            <Text style={styles.menuText}>Schedule your plan</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <Feather name="clock" size={22} color="black" />
            <Text style={styles.menuText}>Recent Location</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("savedPlaces")}>
            <FontAwesome5 name="bookmark" size={22} color="black" />
            <Text style={styles.menuText}>Saved Places</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("settings")}>
            <Ionicons name="settings-sharp" size={22} color="black" />
            <Text style={styles.menuText}>Settings</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.menuItem}>
            <MaterialIcons name="help-outline" size={24} color="black" />
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
    width: "75%", // 80% of screen width
    height: "100%",
    backgroundColor: "#4CAF50", // Menu background color
    padding: 25,
    elevation: 5, // Shadow effect for Android
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 30, // Larger font size for better readability
    fontWeight: "bold",
    marginBottom: 40,
    textAlign: "center",
    color: "black", // Highlight color for the title
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 25,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 25,
  },
  greeting: {
    fontSize: 26, // Larger font for greeting
    fontWeight: "bold",
    marginBottom: 10,
    backgroundColor: "#fff", // Highlight color for the greeting
    padding: 5,
    borderRadius: 10,
  },
  profileButton: {
    backgroundColor: '#e0f7fa',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    marginTop: 5,
    width: 120,
    height: 40,
  },
  profileText: {
    fontSize: 14, // Slightly larger text
    fontWeight: "bold",
    color: "#00796B", // Subtle green for text
    textAlign: "center",
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 15,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    borderRadius: 10,
    marginBottom: 5,
    backgroundColor: "#fff", // White background for menu items
    paddingHorizontal: 15, // Adds padding on the left and right for spacing
  },
  menuText: {
    fontSize: 18, // Larger font size for menu text
    marginLeft: 15, // Adds space between the icon and the text
    fontWeight: "bold",
    color: "#333",
  },
});



export default MenuScreen;
