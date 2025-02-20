import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Ionicons, FontAwesome5, Feather, MaterialIcons } from "@expo/vector-icons";
import { Alert } from "react-native";


type RootStackParamList = {
  Profile: undefined;
  SavedPlaces: undefined;
  Settings: undefined;
};

type MenuScreenProps = {
  navigation: NavigationProp<RootStackParamList>;
};

const MenuScreen: React.FC<MenuScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Close Button */}
      <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
        <Ionicons name="close" size={28} color="black" />
      </TouchableOpacity>

      {/* App Title */}
      <Text style={styles.title}>TransitEase</Text>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <Image
          source={require("../../assets/images/download.jpg")} // Replace with actual image path
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
      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Voice Search Coming Soon!")}>
        <FontAwesome5 name="calendar-alt" size={22} color="black" />
        <Text style={styles.menuText}>Schedule your plan</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Recent Location Coming Soon!")}>
        <Feather name="clock" size={22} color="black" />
        <Text style={styles.menuText}>Recent Location</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("SavedPlaces")}>
        <FontAwesome5 name="bookmark" size={22} color="black" />
        <Text style={styles.menuText}>Saved Places</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Settings")}>
        <Ionicons name="settings-sharp" size={22} color="black" />
        <Text style={styles.menuText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.menuItem} onPress={() => Alert.alert("Help and Feedback Coming Soon!")}>
        <MaterialIcons name="help-outline" size={24} color="black" />
        <Text style={styles.menuText}>Help and feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E3F2FD", // Light blue background
    padding: 20,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 0,
    marginBottom: 20,
    textAlign: "left",
    color: "black",
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    marginRight: 24,
  },
  greeting: {
    fontSize: 32,
    fontWeight: "light",
  },
  profileButton: {
    backgroundColor: "#BBDEFB",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginTop: 8,
    width: 105,
  },
  profileText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#1976D2",
  },
  divider: {
    height: 1,
    backgroundColor: "black",
    marginVertical: 10,
    width: "100%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  menuText: {
    fontSize: 18,
    marginLeft: 15,
    fontWeight: "bold",
    color: "black",
  },
});

export default MenuScreen;