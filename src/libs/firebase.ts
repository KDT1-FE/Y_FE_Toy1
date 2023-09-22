// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  initializeFirestore,
  persistentLocalCache,
} from "firebase/firestore";
import {
  browserSessionPersistence,
  getAuth,
  setPersistence,
} from "firebase/auth";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
export const firestoreDb = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

// setPersistence(auth, browserSessionPersistence) // broswerSessionPersistence
//   .then(() => {
//     console.log("로그인 유지 설정 완료");
//   })
//   .catch((error) => {
//     console.error("로그인 유지 설정 오류:", error);
//   });
