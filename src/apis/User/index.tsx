import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from '@firebase/auth';
import { collection, orderBy, where, query } from '@firebase/firestore';
import { auth, db } from 'apis/firebase';
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

export const searchUser = (collectionName: string) => {
  const user: IuserData | undefined = getSessionUserData();
  const searchUserQuery = query(
    collection(db, collectionName),
    where('uid', '==', user?.uid),
    orderBy('timeStamp', 'desc'),
  );
  return searchUserQuery;
};
