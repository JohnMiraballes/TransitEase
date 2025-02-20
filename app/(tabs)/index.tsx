import * as React from "react";
import { useEffect, useState, useCallback } from "react";
import { ActivityIndicator, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Import Screens
import StartScreen from "./StartScreen";
import SplashScreen from "./SplashScreen";
import HomeScreen from "./HomeScreen";
import NavigationScreen from "./navigation";
import AboutScreen from "./about";
import InstructionScreen from "./InstructionScreen";
import SettingsScreen from "./settings";
import AppsScreen from "./AppScreen";
import TeamScreen from "./TeamScreen";
import SavedPlacesScreen from "./saved";
import MenuScreen from "./MenuScreen";
import ProfileScreen from "./Profile";
import LoginScreen from "./LoginScreen";
import SignUpScreen from "./SignUpScreen";
import ForgotPasswordScreen from "./ForgotPasswordScreen";

// Define types for stack parameters
type RootStackParamList = {
  Start: undefined;
  Splash: undefined;
  Home: undefined;
  Navigation: undefined;
  About: undefined;
  Instruction: undefined;
  Settings: undefined;
  Apps: undefined;
  Team: undefined;
  SavedPlaces: undefined;
  Menu: undefined;
  Profile: undefined;
  Login: undefined;
  SignUp: undefined;
  ForgotPassword: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [isFirstLaunch, setIsFirstLaunch] = useState<boolean | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  // Check if it's the user's first time opening the app
  const checkFirstLaunch = useCallback(async () => {
    try {
      const firstTime = await AsyncStorage.getItem("isFirstTime");
      if (firstTime === null) {
        await AsyncStorage.setItem("isFirstTime", "false");
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    } catch (error) {
      console.error("Error checking first launch:", error);
    }
  }, []);

  // Check if user is already logged in
  const checkLoginStatus = useCallback(async () => {
    try {
      const userToken = await AsyncStorage.getItem("userToken");
      setIsLoggedIn(userToken ? true : false);
    } catch (error) {
      console.error("Error checking login status:", error);
    }
  }, []);

  useEffect(() => {
    checkFirstLaunch();
    checkLoginStatus();
  }, [checkFirstLaunch, checkLoginStatus]);

  // Show loading indicator while checking storage
  if (isFirstLaunch === null || isLoggedIn === null) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#4A90E2" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack.Navigator
        initialRouteName={
          isFirstLaunch ? "Start" : isLoggedIn ? "Home" : "Login"
        }
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Start" component={StartScreen} />
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="Navigation" component={NavigationScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Instruction" component={InstructionScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
        <Stack.Screen name="Apps" component={AppsScreen} />
        <Stack.Screen name="Team" component={TeamScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
        <Stack.Screen name="Menu" component={MenuScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Login">
          {(props) => <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
      </Stack.Navigator>
    </GestureHandlerRootView>
  );
}
