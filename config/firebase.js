import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getFirestore, collection } from "firebase/firestore";
import { getStorage } from 'firebase/storage';
import { Platform } from 'react-native';

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDUgOjxTsAo09MTmR1W3INCaoZ26SFwXwQ",
  authDomain: "en-able-168f9.firebaseapp.com",
  projectId: "en-able-168f9",
  storageBucket: "en-able-168f9.firebasestorage.app",
  messagingSenderId: "728769658546",
  appId: "1:728769658546:web:c9d8fb7e3e7cb23ac8d3ab",
  measurementId: "G-3CN19CMQR0"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Use correct auth initialization based on platform
let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app); // Use standard web auth
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

export { auth };

export const db = getFirestore(app);
export const storage = getStorage(app);
export const usersRef = collection(db, 'users');
