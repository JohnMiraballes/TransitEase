import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AboutScreen = () => (
  <View style={styles.container}>
    <Text style={styles.title}>About the App</Text>
    <Text>
      Transit Made Easy is a mobile public transport navigation app designed
      to assist elderly individuals and persons with disabilities.
    </Text>
    <Text style={styles.title}>Meet the Team</Text>
    <Text>Developers:</Text>
    <Text>John Paul B. Nape - Frontend/Backend</Text>
    <Text>John Angel D. Culubong - Frontend</Text>
    <Text>John L. Miraballes - Frontend</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
});

export default AboutScreen;
