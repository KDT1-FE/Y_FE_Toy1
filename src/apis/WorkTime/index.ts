import { db } from '../firebase';
import {
  addDoc,
  collection,
  getDocs,
  serverTimestamp,
} from '@firebase/firestore';
import { WORK_TIME_COLLECTION } from 'constants/collection';
import { ERROR_ALERT } from 'constants/alert';
import { IuserData } from 'types/user';
import { getSessionUserData } from 'utils/user';
import { searchUser } from 'apis/User';

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

export const getWorkTimeData = async () => {
  try {
    const response = await getDocs(searchUser(WORK_TIME_COLLECTION));

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
