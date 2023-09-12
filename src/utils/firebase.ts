// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyDdTBAy3IzoA_tx-3xM8D59o4S1nZzEax4',
    authDomain: 'wiki-for-fastcampus.firebaseapp.com',
    projectId: 'wiki-for-fastcampus',
    storageBucket: 'wiki-for-fastcampus.appspot.com',
    messagingSenderId: '302754346576',
    appId: '1:302754346576:web:bfc3d5da1f48f02814c355',
    measurementId: 'G-MMJ9WKS2VD',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
export const storage = getStorage(app);
