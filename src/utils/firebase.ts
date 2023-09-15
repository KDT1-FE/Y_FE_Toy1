import { initializeApp } from 'firebase/app';
import { getFirestore, Firestore, doc, getDocs, collection } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDdTBAy3IzoA_tx-3xM8D59o4S1nZzEax4',
    authDomain: 'wiki-for-fastcampus.firebaseapp.com',
    projectId: 'wiki-for-fastcampus',
    storageBucket: 'wiki-for-fastcampus.appspot.com',
    messagingSenderId: '302754346576',
    appId: '1:302754346576:web:bfc3d5da1f48f02814c355',
    measurementId: 'G-MMJ9WKS2VD',
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const firestore: Firestore = getFirestore(app);

export const handleGetDocs = async (collectionName: string) => {
    const collectionRef = collection(firestore, collectionName);
    try {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
            console.log('Document ID:', doc.id);
            console.log('Document data:', doc.data());
        });
        return querySnapshot;
    } catch (error) {
        console.error('Error fetching documents:', error);
        throw error;
    }
};
