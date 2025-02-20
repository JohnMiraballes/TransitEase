import React, { useState } from "react";
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet 
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons"; // ✅ Import Icons for Eye Toggle

// Define Navigation Type
type RootStackParamList = {
  Login: undefined;
  SignUp: undefined;
};

// Define Props
interface Props {
  navigation: StackNavigationProp<RootStackParamList>;
}

const SignUpScreen: React.FC<Props> = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // ✅ Toggle for Password Visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // ✅ Toggle for Confirm Password

  const [errorMessage, setErrorMessage] = useState(""); // ✅ Error Message State

  const validatePassword = (password: string) => {
    return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password); // ✅ At least 8 chars, letters & numbers
  };

  const handleSignUp = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      setErrorMessage("All fields are required.");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Password must be at least 8 characters long and include letters and numbers.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setErrorMessage(""); // ✅ Clear errors on valid input
    console.log("Signing up with:", { name, email, password });

    // Navigate to Login after successful signup
    navigation.replace("Login");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>

      {/* Name Input */}
      <Text style={styles.label}>Full Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        placeholderTextColor="#aaa"
        value={name}
        onChangeText={(text) => {
          setName(text);
          setErrorMessage(""); // ✅ Clear error when typing
        }}
      />

      {/* Email Input */}
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        placeholderTextColor="#aaa"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={(text) => {
          setEmail(text);
          setErrorMessage(""); // ✅ Clear error when typing
        }}
      />

      {/* Password Input */}
      <Text style={styles.label}>Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Enter your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showPassword} // ✅ Toggle secureTextEntry
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setErrorMessage(""); // ✅ Clear error when typing
          }}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Confirm Password Input */}
      <Text style={styles.label}>Confirm Password</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.passwordInput}
          placeholder="Confirm your password"
          placeholderTextColor="#aaa"
          secureTextEntry={!showConfirmPassword} // ✅ Toggle secureTextEntry
          value={confirmPassword}
          onChangeText={(text) => {
            setConfirmPassword(text);
            setErrorMessage(""); // ✅ Clear error when typing
          }}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}
        >
          <Ionicons
            name={showConfirmPassword ? "eye" : "eye-off"}
            size={24}
            color="#888"
          />
        </TouchableOpacity>
      </View>

      {/* Error Message */}
      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Sign Up Button */}
      <TouchableOpacity 
        style={[styles.button, (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) && styles.disabledButton]} 
        onPress={handleSignUp}
        disabled={!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()} // ✅ Disable if fields are empty
      >
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      {/* Navigate to Login */}
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.loginText}>Already have an account? Log in</Text>
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
    marginBottom: 20,
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
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#222",
    borderRadius: 10,
    paddingRight: 10,
    marginBottom: 15, // ✅ Space for eye icon
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
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#555", // ✅ Gray color when disabled
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  loginText: {
    color: "#4A90E2",
    fontSize: 16,
    marginTop: 15,
  },
});

export default SignUpScreen;
