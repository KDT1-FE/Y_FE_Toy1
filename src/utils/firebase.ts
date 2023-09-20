import { initializeApp } from 'firebase/app';

import {
    getFirestore,
    Firestore,
    doc,
    getDocs,
    addDoc,
    collection,
    deleteDoc,
    getDoc,
    setDoc,
    onSnapshot,
    QuerySnapshot,
    arrayUnion,
    arrayRemove,
    updateDoc,
    query,
    orderBy,
} from 'firebase/firestore';

import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
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
export const createTimelog = async (collectionName: string, userName: string, currentTime: string) => {
    const value = currentTime;
    const userRef = doc(firestore, collectionName, userName);
    try {
        const pushTimeLog = await updateDoc(userRef, { timelog: arrayUnion(value) });
        alert(`${value}\n입/퇴실기록이 정상 기록되었습니다!`);
        console.log(value);
        console.log('입/퇴실기록이 정상 기록되었습니다!');
    } catch (error) {
        console.error('타임로그 생성 실패!', error);
        throw error;
    }
};
// user의 정보를 가져옴
export const readUser = async (collectionName: string, userName: string) => {
    const userRef = doc(firestore, collectionName, userName);
    try {
        const Docs = await getDoc(userRef);
        if (Docs) {
            const data = Docs.data();
            if (data) {
                return data;
            }
        }
    } catch (error) {
        console.error('타임로그 생성 실패!', error);
        throw error;
    }
};
export const updateUserName = async (collectionName: string, userName: string, updateData: string) => {
    const value = updateData;
    const userRef = doc(firestore, collectionName, userName);
    try {
        const pushTimeLog = await updateDoc(userRef, { name: value });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const updateUserEmail = async (collectionName: string, userName: string, updateData: string) => {
    const value = updateData;
    const userRef = doc(firestore, collectionName, userName);
    try {
        const pushTimeLog = await updateDoc(userRef, { email: value });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const updateUserInfo = async (collectionName: string, userName: string, updateData: string) => {
    const value = updateData;
    const userRef = doc(firestore, collectionName, userName);
    try {
        const pushTimeLog = await updateDoc(userRef, { info: value });
    } catch (error) {
        console.error(error);
        throw error;
    }
};
export const updateUserImg = async (collectionName: string, userName: string, updateData: string) => {
    const value = updateData;
    const userRef = doc(firestore, collectionName, userName);
    try {
        const pushTimeLog = await updateDoc(userRef, { imageURL: value });
    } catch (error) {
        console.error(error);
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

export const addUser = async (uid: string, value: any) => {
    try {
        const addUserFirestore = await setDoc(doc(firestore, 'user', uid), value);
    } catch (error) {
        console.error('계정 등록에 실패했습니다.', error);
    }
};

export const uploadStorage = async (userId: string, file: File) => {
    const storageRef = ref(storage, 'user');
    const userRef = ref(storageRef, userId);
    await uploadBytes(userRef, file);
    const imgURL = await getDownloadURL(userRef);
    return imgURL;
};

export const getRecruitmentDetail = async (channel: string, path: string) => {
    const docRef = doc(firestore, 'recruitmentContainer', 'recruitment', channel, path);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        const userDocRef = doc(firestore, 'user', docSnap.data().uid);
        const userDocSnap = await getDoc(userDocRef);
        const data = { ...docSnap.data(), ...userDocSnap.data() };
        for (let i = 0; i < data.comment.length; i++) {
            const commentUserDocRef = doc(firestore, 'user', data.comment[i].uid);
            const commentUserDocSnap = await getDoc(commentUserDocRef);
            data.comment[i] = { ...data.comment[i], ...commentUserDocSnap.data() };
        }
        return data;
    } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
    }
};

export const getUserName = async (uid: string) => {
    const docRef = doc(firestore, 'user', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data().name;
    } else {
        console.log('No such document!');
    }
};

export const getUserData = async (uid: string) => {
    const docRef = doc(firestore, 'user', uid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        console.log('No such document!');
    }
};

interface Value {
    uid: string;
    content: string;
    time: string;
}

export const createComment = async (channel: string, path: string, value: Value) => {
    const docRef = doc(firestore, 'recruitmentContainer', 'recruitment', channel, path);

    try {
        const pushComment = await updateDoc(docRef, { comment: arrayUnion(value) });
        console.log('댓글 작성에 성공했습니다');
    } catch (error) {
        console.error('댓글 작성에 실패했습니다.', error);
        throw error;
    }
};

export const deleteComment = async (channel: string, path: string, value: Value) => {
    const docRef = doc(firestore, 'recruitmentContainer', 'recruitment', channel, path);

    try {
        const deleteComment = await updateDoc(docRef, { comment: arrayRemove(value) });
        console.log('댓글 삭제에 성공했습니다');
    } catch (error) {
        console.error('댓글 삭제에 실패했습니다.', error);
    }
};

export const showRecruitmentFields = async (
    collectionName: string,
    documentName: string,
    subcollectionName: string,
): Promise<{ docSnapshots: any[] }> => {
    const documentRef = doc(firestore, collectionName, documentName);

    try {
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
            const subcollectionRef = collection(documentRef, subcollectionName);
            const querySnapshot = await getDocs(query(subcollectionRef, orderBy('time', 'desc')));
            const docSnapshots = querySnapshot.docs.map((docSnapshot) => ({
                id: docSnapshot.id,
                data: docSnapshot.data(),
            }));

            return { docSnapshots };
        } else {
            console.error('상위 문서가 존재하지 않습니다.');
            return { docSnapshots: [] }; // 빈 배열을 반환하여 오류 시 데이터가 없음을 표시
        }
    } catch (error) {
        console.error('데이터 가져오기 실패!', error);
        throw error;
    }
};

export const createRecruitment = async (channel: string, value: any) => {
    try {
        const addRecruitment = await addDoc(
            collection(firestore, 'recruitmentContainer', 'recruitment', channel),
            value,
        );
        console.log('게시글 생성에 성공했습니다');
    } catch (error) {
        console.error('게시글 작성에 실패했습니다.', error);
        throw error;
    }
};

export const updateRecruitment = async (channel: string, path: string, value: any) => {
    try {
        const updateRecruitment = await setDoc(
            doc(firestore, 'recruitmentContainer', 'recruitment', channel, path),
            value,
        );
        console.log('게시글 수정에 성공했습니다');
    } catch (error) {
        console.error('게시글 수정에 실패했습니다.', error);
        throw error;
    }
};

export const deleteRecruitment = async (channel: string, path: string) => {
    try {
        const updateRecruitment = await deleteDoc(doc(firestore, 'recruitmentContainer', 'recruitment', channel, path));
        console.log('게시글 삭제에 성공했습니다');
    } catch (error) {
        console.error('게시글 삭제에 실패했습니다.', error);
        throw error;
    }
};

export const updateChannelContent = async (
    collectionName: string,
    Channel: string,
    subChannel: string,
    docContent: string,
) => {
    const docRef = doc(firestore, collectionName, Channel);
    try {
        // Update the specific field (subChannel) with the new content (docContent)
        const docSnapshot = await getDoc(docRef);
        if (docSnapshot.exists()) {
            const currentData = docSnapshot.data();
            // Update the nested field
            currentData[subChannel].content = docContent;
            // Update the document with the modified data
            await updateDoc(docRef, currentData);
            console.log(currentData[subChannel].content);
            console.log('Nested field updated successfully.');
        } else {
            console.error('Document does not exist.');
        }
    } catch (error) {
        console.error('채널 내용 수정 실패!', error);
        throw error;
    }
};
