// firebaseServices/firebaseRealtime.js
import { realtimeDb } from "./firebaseConfig";
import { ref, set, onValue } from "firebase/database";

// Function to update real-time location
export const updateLocation = (userId, latitude, longitude) => {
  set(ref(realtimeDb, "locations/" + userId), {
    latitude,
    longitude,
    timestamp: Date.now(),
  });
};

// Listen for real-time location updates
export const listenForLocationUpdates = (userId, callback) => {
  const locationRef = ref(realtimeDb, "locations/" + userId);
  onValue(locationRef, (snapshot) => {
    const data = snapshot.val();
    if (data) {
      callback(data); // Pass the updated location data
    }
  });
};
