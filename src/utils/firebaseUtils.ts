import { db } from '../common/config';
import { commuteType } from '../data/atoms';
import { doc, updateDoc } from 'firebase/firestore';

export const uploadCommuteInfo = async (uid: string, commuteData: commuteType) => {
  const userDoc = doc(db, 'commute', uid);
  const dateStr = new Date(commuteData.date).toISOString().split('T')[0];

  const updateData = {
    [dateStr]: {
      // date: commuteData.date,
      // commute: commuteData.commute,
      startTime: commuteData.startTime,
      endTime: commuteData.endTime,
      workingTime: commuteData.workingTime,
    },
  };

  await updateDoc(userDoc, updateData);
};
