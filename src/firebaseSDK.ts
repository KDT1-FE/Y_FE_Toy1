// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAty4PjJBHIoWyvKNGwVRcaX1M-60iPfTE',
  authDomain: 'wikinity-947f0.firebaseapp.com',
  projectId: 'wikinity-947f0',
  storageBucket: 'wikinity-947f0.appspot.com',
  messagingSenderId: '390893293038',
  appId: '1:390893293038:web:02aa6ad55fb5c67283d2ff'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
