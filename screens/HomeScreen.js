import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const HomeScreen = ({ navigation }) => {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location.coords);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <TextInput 
        style={styles.searchBar} 
        placeholder="Enter destination..." 
        value={searchQuery} 
        onChangeText={setSearchQuery} 
      />
      
      {location && (
        <MapView 
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} title="You are here" />
        </MapView>
      )}

      <Button title="Find Accessible Route" onPress={() => navigation.navigate('Navigation')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  searchBar: { height: 50, borderWidth: 1, borderRadius: 10, paddingHorizontal: 10, marginBottom: 10 },
  map: { flex: 1 },
});

export default HomeScreen;