// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBjMrRAvL85KYQ6okbz7FPTy_iJ6EnSPn0",
  authDomain: "fastcampus-wiki.firebaseapp.com",
  projectId: "fastcampus-wiki",
  storageBucket: "fastcampus-wiki.appspot.com",
  messagingSenderId: "38983729603",
  appId: "1:38983729603:web:395c72acc46e26b15f3d76"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
