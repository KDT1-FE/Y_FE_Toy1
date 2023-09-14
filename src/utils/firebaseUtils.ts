import { auth, db } from '../common/config';
import { commuteType } from '../data/atoms';
import { doc, setDoc } from 'firebase/firestore';

export const uploadCommuteInfo = async (commuteData: commuteType) => {
  const user = auth.currentUser;

  if (user) {
    const { uid } = user;
    const userDoc = doc(db, 'commute', uid);
    await setDoc(userDoc, {
      ...commuteData,
    });
  } else {
  }
};
