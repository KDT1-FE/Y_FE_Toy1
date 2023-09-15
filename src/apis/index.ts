import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { addDoc, collection, serverTimestamp } from '@firebase/firestore';
import { WORK_TIME_COLLECTION } from 'constants/collection';

export const login = async () => {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserSessionPersistence);
  await signInWithPopup(auth, provider);
};

const getSessionUserData = () => {
  for (const key of Object.keys(sessionStorage)) {
    if (key.includes('firebase:authUser:') && key) {
      const user = sessionStorage.getItem(key);
      if (user) return JSON.parse(user);
    }
  }
};

interface userData {
  [key: string]: unknown;
  uid: string;
}
export const addWorkTimeData = async (workTime: number) => {
  const user: userData = getSessionUserData();
  try {
    await addDoc(collection(db, WORK_TIME_COLLECTION), {
      workTime: workTime,
      uid: user.uid,
      timeStamp: serverTimestamp(),
    });
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};
