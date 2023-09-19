import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import app from './config';

import swal from 'sweetalert';
import '../scss/components/auth/swal.scss';

const db = getFirestore(app);
const auth = getAuth(app);

const createUser = (email: string, password: string, name: string) => {
  return createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      swal({
        className: 'success',
        title: '회원가입이 성공적으로 완료되었습니다.',
        icon: 'success',
      }).then(async () => {
        try {
          const docRef = await setDoc(doc(db, 'users', email), {
            name: name,
          });

          console.log(docRef);
        } catch (e) {
          console.error('Error adding document: ', e);
        }
      });
      return 'success';
    })
    .catch(error => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.error(errorCode, errorMessage);

      if (errorCode === 'auth/email-already-in-use') {
        swal({
          className: 'error',
          title: '회원가입에 실패했습니다.',
          text: '해당 이메일을 사용하는 유저가 이미 등록되어 있습니다.',
          icon: 'warning',
        });
      }
      return 'failed';
    });
};

export default createUser;
