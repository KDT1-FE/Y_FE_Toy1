import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth, db } from '../firebase';
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
import { ERROR_ALERT } from 'constants/alert';
import { IuserData } from 'types/user';
import { getSessionUserData } from 'utils/user';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserSessionPersistence);
    await signInWithPopup(auth, provider);
  } catch (error) {
    alert(ERROR_ALERT);
  }
};

export const addWorkTimeData = (workTime: number) => {
  const user: IuserData | undefined = getSessionUserData();
  try {
    addDoc(collection(db, WORK_TIME_COLLECTION), {
      workTime: workTime,
      uid: user?.uid,
      timeStamp: serverTimestamp(),
      name: user?.displayName,
    });
  } catch (error) {
    alert(ERROR_ALERT);
  }
};

export interface IworkTimeResponse {
  uid: string;
  timeStamp: string;
  workTime: number;
  name: string;
}

const searchUser = () => {
  const user: IuserData | undefined = getSessionUserData();
  const searchUserQuery = query(
    collection(db, WORK_TIME_COLLECTION),
    where('uid', '==', user?.uid),
    orderBy('timeStamp', 'desc'),
  );
  return searchUserQuery;
};

export const getWorkTimeData = async () => {
  try {
    const response = await getDocs(searchUser());

    const responseArray: IworkTimeResponse[] = [];
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
    alert(ERROR_ALERT);
  }
};
