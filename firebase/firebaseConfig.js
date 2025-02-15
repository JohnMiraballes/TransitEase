import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBQtsthBr8URmInseEXL-sEbarFJbpXLws",
  authDomain: "transitapp-699b9.firebaseapp.com",
  databaseURL: "https://transitapp-699b9.firebaseio.com",
  projectId: "transitapp-699b9",
  storageBucket: "transitapp-699b9.appspot.com",
  messagingSenderId: "575186823733",
  appId: "1:575186823733:android:5aedeb5705e8f5063d1f7c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const realtimeDb = getDatabase(app);

export { app, db, auth, realtimeDb };
