import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  Dashboard: undefined;
  Login: undefined;
  Home: undefined;
};

type StartScreenNavigationProp = StackNavigationProp<RootStackParamList, "Home">;

interface Props {
  navigation: StartScreenNavigationProp;
}

const StartScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Transit Ease Text at the top */}
      <Text style={styles.title}>Let's Get Started</Text>

      {/* Logo in the center */}
      <Image
        source={require("../../assets/images/logo1.png")} // Replace with your logo image path
        style={styles.logo}
      />

      {/* Buttons container */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>

        {/* Log In button styled as a white container */}
        <TouchableOpacity style={styles.loginButtonContainer} onPress={() => navigation.navigate("Login")}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 50,
  },
  logo: {
    width: 200,
    height: 200,
    marginVertical: 30,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 50,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 20,
    marginBottom: 10,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loginButtonContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 20,
    marginTop: 10,
    width: "100%",
    alignItems: "center",
  },
  loginButtonText: {
    color: "#000",
    fontSize: 18,
  },
});

export default StartScreen;