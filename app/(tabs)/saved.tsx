// SavedPlacesScreen.tsx

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedPlacesScreen = () => {
  const [homeLocation, setHomeLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);
  const [workLocation, setWorkLocation] = React.useState<{ latitude: number; longitude: number } | null>(null);

  // Load saved locations from AsyncStorage
  React.useEffect(() => {
    const loadSavedLocations = async () => {
      const home = await AsyncStorage.getItem('homeLocation');
      const work = await AsyncStorage.getItem('workLocation');

      if (home) setHomeLocation(JSON.parse(home));
      if (work) setWorkLocation(JSON.parse(work));
    };

    loadSavedLocations();
  }, []);

  const clearLocation = async (type: 'home' | 'work') => {
    await AsyncStorage.removeItem(`${type}Location`);
    if (type === 'home') setHomeLocation(null);
    if (type === 'work') setWorkLocation(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Saved Locations</Text>

      <View style={styles.locationItem}>
        <Text style={styles.locationTitle}>Home:</Text>
        {homeLocation ? (
          <Text style={styles.locationText}>
            {homeLocation.latitude.toFixed(4)}, {homeLocation.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Not set</Text>
        )}
        <TouchableOpacity onPress={() => clearLocation('home')} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.locationItem}>
        <Text style={styles.locationTitle}>Work:</Text>
        {workLocation ? (
          <Text style={styles.locationText}>
            {workLocation.latitude.toFixed(4)}, {workLocation.longitude.toFixed(4)}
          </Text>
        ) : (
          <Text style={styles.locationText}>Not set</Text>
        )}
        <TouchableOpacity onPress={() => clearLocation('work')} style={styles.clearButton}>
          <Text style={styles.clearButtonText}>Clear</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  locationItem: { marginBottom: 20 },
  locationTitle: { fontSize: 18, fontWeight: 'bold' },
  locationText: { fontSize: 16, color: '#555' },
  clearButton: { marginTop: 5, backgroundColor: '#FF6347', padding: 8, borderRadius: 5 },
  clearButtonText: { color: '#fff', fontWeight: 'bold' },
});

export default SavedPlacesScreen;
