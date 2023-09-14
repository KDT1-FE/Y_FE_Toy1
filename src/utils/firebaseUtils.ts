import { db } from '../common/config';
import { commuteType } from '../data/atoms';
import { doc, setDoc } from 'firebase/firestore';

export const uploadCommuteInfo = async (uid: string, commuteData: commuteType) => {
  const userDoc = doc(db, 'commute', uid);
  await setDoc(userDoc, {
    ...commuteData,
  });
};
