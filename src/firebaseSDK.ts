// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAty4PjJBHIoWyvKNGwVRcaX1M-60iPfTE",
  authDomain: "wikinity-947f0.firebaseapp.com",
  projectId: "wikinity-947f0",
  storageBucket: "wikinity-947f0.appspot.com",
  messagingSenderId: "797341209119",
  appId: "1:797341209119:web:2050b066c2b097c8d13b2a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
