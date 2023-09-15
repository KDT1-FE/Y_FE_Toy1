import { db } from '../common/config';
import { commuteType } from '../data/atoms';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

export const uploadCommuteInfo = async (uid: string, commuteData: commuteType) => {
  const userRef = doc(db, 'commute', uid);
  const userDoc = await getDoc(userRef);
  const dateStr = new Date(commuteData.date).toISOString().split('T')[0];

  const updateData = {
    [dateStr]: {
      startTime: commuteData.startTime,
      endTime: commuteData.endTime,
      workingTime: commuteData.workingTime,
    },
  };
  if (!userDoc.exists()) {
    await setDoc(userRef, updateData);
  } else {
    await updateDoc(userRef, updateData);
  }
};
