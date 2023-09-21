import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from '@firebase/auth';
import { auth } from 'apis/firebase';
import { ERROR_ALERT } from 'constants/alert';

export const login = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await setPersistence(auth, browserSessionPersistence);
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.log(error);
    alert(ERROR_ALERT);
  }
};
