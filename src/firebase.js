// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBMAbvtdBLMz0ZBWKCUdl1XhEauPpur7q8',
  authDomain: 'highfive-dev-4d7f4.firebaseapp.com',
  projectId: 'highfive-dev-4d7f4',
  storageBucket: 'highfive-dev-4d7f4.appspot.com',
  messagingSenderId: '320913228177',
  appId: '1:320913228177:web:7270a7de6935e938d4da30',
  measurementId: 'G-D3PVM4TYE4',
};

// Initialize Firebase
export default initializeApp(firebaseConfig);
