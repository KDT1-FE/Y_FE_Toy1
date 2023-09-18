import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from './firebase';
import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  where,
} from '@firebase/firestore';
import { WORK_TIME_COLLECTION } from 'constants/collection';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserSessionPersistence);
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};

const getSessionUserData = () => {
  for (const key of Object.keys(sessionStorage)) {
    if (key.includes('firebase:authUser:') && key) {
      const user = sessionStorage.getItem(key);
      if (user) return JSON.parse(user);
    }
  }
};

interface IuserData {
  [key: string]: unknown;
  uid: string;
  displayName: string;
}
export const addWorkTimeData = (workTime: number) => {
  const user: IuserData = getSessionUserData();
  try {
    addDoc(collection(db, WORK_TIME_COLLECTION), {
      workTime: workTime,
      uid: user.uid,
      timeStamp: serverTimestamp(),
      name: user.displayName,
    });
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};

interface IresponseArray {
  uid: string;
  timeStamp: string;
  workTime: number;
  name: string;
}

const searchUser = () => {
  const user: IuserData = getSessionUserData();
  const searchUserQuery = query(
    collection(db, WORK_TIME_COLLECTION),
    where('uid', '==', user.uid),
    orderBy('timeStamp', 'desc'),
  );
  return searchUserQuery;
};

export const getWorkTimeData = async () => {
  try {
    const response = await getDocs(searchUser());

    const responseArray: IresponseArray[] = [];
    response.forEach((doc) => {
      const workTimeData = doc.data();
      responseArray.push({
        uid: workTimeData.uid,
        timeStamp: workTimeData.timeStamp.toDate(),
        workTime: workTimeData.workTime,
        name: workTimeData.name,
      });
    });
    return responseArray;
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};
