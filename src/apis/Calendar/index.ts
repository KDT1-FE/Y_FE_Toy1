import { db } from 'apis/firebase';
import { addDoc, collection } from 'firebase/firestore';
import { getSessionUserData } from 'utils/user';

interface ICalendarData {
  content: string;
  startDate: string;
  endDate: string;
}
export const uploadCalendarData = async (calendarData: ICalendarData) => {
  const user = getSessionUserData();
  await addDoc(collection(db, 'calendar'), { ...calendarData, uid: user.uid });
  console.log('성공~');
};
