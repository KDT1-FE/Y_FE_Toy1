// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { getFirestore, Firestore, doc, getDocs, collection, addDoc, setDoc, onSnapshot } from 'firebase/firestore';
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

// export const storage: Storage = getStorage(app);
export const firestore: Firestore = getFirestore(app);

export const handleGetDocs = async (collectionName: string) => {
    const collectionRef = collection(firestore, collectionName);
    try {
        const querySnapshot = await getDocs(collectionRef);
        console.log('문서 가져오기 성공!');
        return querySnapshot;
    } catch (error) {
        console.error('문서 가져오기 실패!', error);
        throw error;
    }
};

export const createChannelDoc = async (collectionName: string, documentName: string) => {
    const dataToAdd = {}; // 서브채널 없이 채널만 생성하기 위해 빈 객체 삽입
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        await setDoc(documentRef, dataToAdd);
        console.log('채널 생성 성공!');
    } catch (error) {
        console.error('채널 생성 실패!', error);
        throw error;
    }
};
