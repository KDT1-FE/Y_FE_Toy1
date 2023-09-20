import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import app from './config';

import swal from 'sweetalert';
import '../scss/components/auth/swal.scss';

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

      if (errorCode === 'auth/user-not-found') {
        swal({
          className: 'error',
          title: '로그인에 실패했습니다.',
          text: '이메일과 비밀번호를 다시 한번 확인해주세요',
          icon: 'warning',
        });
      }
    });
};

export { getUserName, requestLogin };
