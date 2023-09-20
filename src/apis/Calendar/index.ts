import { searchUser } from 'apis/User';
import { db } from 'apis/firebase';
import { CALENDAR_COLLECTION } from 'constants/collection';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from 'firebase/firestore';
import { getSessionUserData } from 'utils/user';

interface ICalendarData {
  content: string;
  startDate: string;
  endDate: string;
}

interface ICalendarResponse {
  start: Date;
  end: Date;
  title: string;
  id: string;
}

export const uploadCalendarData = async (calendarData: ICalendarData) => {
  try {
    const user = getSessionUserData();
    await addDoc(collection(db, CALENDAR_COLLECTION), {
      ...calendarData,
      uid: user?.uid,
    });
    alert('등록 완료');
  } catch (error) {
    alert('알 수 없는 오류입니다');
  }
};

export const getCalendarData = async () => {
  try {
    const response = await getDocs(searchUser(CALENDAR_COLLECTION));
    const responseArray: ICalendarResponse[] = [];
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
    await deleteDoc(doc(db, CALENDAR_COLLECTION, id));
  } catch (error) {
    alert('데이터를 삭제하는 과정에서 오류가 발생했습니다.');
  }
};
