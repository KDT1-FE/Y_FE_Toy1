import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import app from './config';

const db = getFirestore(app);
const auth = getAuth(app);

const getUserName = async (email: string) => {
  const ref = doc(db, 'users', email);
  const snapshot = await getDoc(ref);
  const userName = snapshot.data()!.name;

  return userName;
};

const requestLogin = (email: string, password: string) => {
  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      // Signed in
      const user = userCredential.user;

      console.log('Sign in success!', user);
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode, errorMessage);
    });
};

export { getUserName, requestLogin };
