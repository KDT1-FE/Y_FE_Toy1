import { db } from 'apis/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { getSessionUserData } from 'utils/user';

interface ICalendarData {
  content: string;
  startDate: string;
  endDate: string;
}
interface IuserData {
  [key: string]: unknown;
  uid: string;
  displayName: string;
}
export const uploadCalendarData = async (calendarData: ICalendarData) => {
  try {
    const user = getSessionUserData();
    await addDoc(collection(db, 'calendar'), {
      ...calendarData,
      uid: user.uid,
    });
    alert('등록 완료');
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};
const searchUser = () => {
  const user: IuserData = getSessionUserData();
  const searchUserQuery = query(
    collection(db, 'calendar'),
    where('uid', '==', user.uid),
  );
  return searchUserQuery;
};

interface IresponseArray {
  start: Date;
  end: Date;
  title: string;
  id: string;
}

export const getCalendarData = async () => {
  try {
    const response = await getDocs(searchUser());
    const responseArray: IresponseArray[] = [];
    response.forEach((doc) => {
      const calendarData = doc.data();
      responseArray.push({
        title: calendarData.content,
        start: new Date(calendarData.startDate),
        end: new Date(calendarData.endDate),
        id: doc.id,
      });
    });
    return responseArray;
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};
export const deleteCalendarData = async (id: string) => {
  try {
    await deleteDoc(doc(db, 'calendar', id));
  } catch (error) {
    alert('데이터를 삭제하는 과정에서 오류가 발생했습니다.');
  }
};
