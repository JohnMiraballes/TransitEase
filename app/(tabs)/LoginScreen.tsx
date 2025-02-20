import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet 
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { StackNavigationProp } from "@react-navigation/stack";

// Import Expo Icons (You may need to install: expo install @expo/vector-icons)
import { Ionicons } from "@expo/vector-icons";

// Define navigation type
type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// Define props for LoginScreen
interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
  setIsLoggedIn: (value: boolean) => void;
}

const LoginScreen: React.FC<Props> = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // ✅ Password Visibility State
  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error Message State

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    console.log("Logging in with:", email, password);
    setErrorMessage(""); // ✅ Clear error message on valid input

    // Simulate authentication (replace with actual API call)
    if (email === "test@example.com" && password === "password123") {
      try {
        await AsyncStorage.setItem("userToken", "dummy_token"); // ✅ Store login token
        setIsLoggedIn(true); // ✅ Update login state
        navigation.replace("Home"); // Navigate to Home
      } catch (error) {
        console.error("Error saving token:", error);
      }
    } else {
      setErrorMessage("Invalid email or password."); // ✅ Show error on wrong credentials
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#888"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(""); // Clear error when typing
        }}
      />

      {/* Password Input with Eye Icon */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#888"
          secureTextEntry={!showPassword} // ✅ Toggle secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(""); // Clear error when typing
          }}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"} // ✅ Change icon dynamically
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Login Button */}
      <TouchableOpacity 
        style={[styles.loginButton, (!email.trim() || !password.trim()) && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={!email.trim() || !password.trim()} // ✅ Disable if fields are empty
      >
        <Text style={styles.loginButtonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
        <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 32,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 30,
  },
  label: {
    alignSelf: "flex-start",
    fontSize: 14,
    color: "#bbb",
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: "#222",
    color: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingRight: 10, // ✅ Space for eye icon
  },
  passwordInput: {
    flex: 1,
    color: "#fff",
    padding: 15,
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: "#FF6B6B",
    marginBottom: 10,
    marginTop: -5,
    alignSelf: "flex-start",
  },
  loginButton: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    width: "100%",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#555", // ✅ Gray color when disabled
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  forgotPassword: {
    color: "#bbb",
    marginTop: 15,
  },
  signupText: {
    color: "#4A90E2",
    marginTop: 20,
  },
});

export default LoginScreen;
