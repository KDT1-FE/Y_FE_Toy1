import {
  GoogleAuthProvider,
  browserSessionPersistence,
  setPersistence,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from './firebase';

export const login = async () => {
  const provider = new GoogleAuthProvider();
  await setPersistence(auth, browserSessionPersistence);
  await signInWithPopup(auth, provider);
};
