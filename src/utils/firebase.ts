import { initializeApp } from 'firebase/app';

import {
    getFirestore,
    Firestore,
    doc,
    getDocs,
    collection,
    deleteDoc,
    getDoc,
    setDoc,
    onSnapshot,
    QuerySnapshot,
    addDoc,
    updateDoc,
    arrayUnion,
} from 'firebase/firestore';

import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { Snapshot } from 'recoil';

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
export const auth = getAuth(app);
export const storeRef = doc(firestore, 'gallery', '레퍼런스 공유');

export type DocumentData = { [key: string]: any };

export const handleGetDocs = (
    collectionName: string,
    callback: (querySnapshot: QuerySnapshot<DocumentData>) => void,
) => {
    const collectionRef = collection(firestore, collectionName);

    // onSnapshot 함수를 사용하여 실시간 업데이트를 수신
    const updatedQuerySnapshot = onSnapshot(collectionRef, (querySnapshot) => {
        console.log('문서 가져오기 성공 (실시간 업데이트)!');
        callback(querySnapshot); // 실시간 업데이트를 콜백 함수로 전달
    });

    return updatedQuerySnapshot;
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
// user의 타임로그 배열 형태로 저장
export const createTimelog = async (collectionName: string, documentName: string, currentTime: string) => {
    const value = currentTime;
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        const pushTimeLog = await updateDoc(documentRef, { timelog: arrayUnion(value) });
        alert(`${value}\n입/퇴실기록이 정상 기록되었습니다!`);
        console.log(value);
        console.log('입/퇴실기록이 정상 기록되었습니다!');
    } catch (error) {
        console.error('타임로그 생성 실패!', error);
        throw error;
    }
};

export const addFieldToDoc = async (
    collectionName: string,
    documentName: string,
    fieldName: string,
    fieldValue: any,
) => {
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        const documentSnapshot = await getDoc(documentRef); // document를 가져와서 기존 데이터를 읽어옴
        if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            data[fieldName] = fieldValue; // 새로운 필드 추가
            await setDoc(documentRef, data); // 업데이트된 데이터를 다시 document에 저장
            console.log(`서브채널 생성 성공!`);
        } else {
            console.error('채널이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('서브채널 생성 실패!', error);
        throw error;
    }
};

export const deleteChannelDoc = async (collectionName: string, documentName: string) => {
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        await deleteDoc(documentRef);
        console.log('채널 삭제 성공!');
    } catch (error) {
        console.error('채널 삭제 실패!', error);
        throw error;
    }
};

export const deleteFieldFromDoc = async (collectionName: string, documentName: string, fieldName: string) => {
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            delete data[fieldName];
            await setDoc(documentRef, data);
            console.log(`서브채널 삭제 성공!`);
        } else {
            console.error('채널이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('서브채널 삭제 실패!', error);
        throw error;
    }
};

export const updateChannelDoc = async (collectionName: string, oldDocName: string, newDocName: string) => {
    const oldDocRef = doc(firestore, collectionName, oldDocName);
    const newDocRef = doc(firestore, collectionName, newDocName);

    try {
        // 수정하려는 document의 field 값을 읽어온 후, 새로운 document에 복사
        const oldDocumentSnapshot = await getDoc(oldDocRef);
        const data = oldDocumentSnapshot.data();
        await deleteDoc(oldDocRef);
        await setDoc(newDocRef, data);
        console.log('채널 수정 성공!');
    } catch (error) {
        console.error('채널 수정 실패!', error);
        throw error;
    }
};

export const updateFieldKeyInDoc = async (
    collectionName: string,
    documentName: string,
    oldKey: string,
    newKey: string,
) => {
    const documentRef = doc(firestore, collectionName, documentName);
    try {
        const documentSnapshot = await getDoc(documentRef);
        if (documentSnapshot.exists()) {
            const data = documentSnapshot.data();
            // Do not access Object.prototype method 'hasOwnProperty' from target object 에러로 인해
            // (data.hasOwnProperty(oldKey))를 다음과 같이 변경. (Object.prototype.hasOwnProperty.call(data, oldKey))
            if (Object.prototype.hasOwnProperty.call(data, oldKey)) {
                const updatedData = { ...data }; // 새로운 객체 생성
                updatedData[newKey] = updatedData[oldKey]; // 기존 키를 새로운 키로 복사하고, 기존 키는 삭제
                delete updatedData[oldKey];
                await setDoc(documentRef, updatedData); // 업데이트된 데이터를 다시 문서에 저장
            } else {
                console.error('수정하려는 서브채널이 존재하지 않습니다.');
            }
        } else {
            console.error('채널이 존재하지 않습니다.');
        }
    } catch (error) {
        console.error('서브채널 수정 실패!', error);
        throw error;
    }
};
