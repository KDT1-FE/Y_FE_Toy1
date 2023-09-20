import { User } from 'firebase/auth';
import { auth, db } from '../common/config';
import { useState, ChangeEvent } from 'react';
import { updatePhoneNumber, RecaptchaVerifier, PhoneAuthProvider } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const JoinPhoneNumber = ({ user }: { user: User | null }) => {
  const [phone, setPhone] = useState<string>('');
  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const addPhoneNumber = () => {
    if (user) {
      if (phone) {
        const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: (recaptchaToken: string) => {
            // Callback 로직
            const phoneNumber = `+82${phone?.substring(1)}`;
            const provider = new PhoneAuthProvider(auth);
            provider
              .verifyPhoneNumber(phoneNumber, appVerifier)
              .then((verificationId) => {
                const code = window.prompt('인증 코드를 입력하세요:');
                if (code) {
                  const credential = PhoneAuthProvider.credential(verificationId, code);

                  updatePhoneNumber(user, credential)
                    .then(async () => {
                      appVerifier.clear();
                      const docRef = doc(db, 'user', user.uid);
                      await updateDoc(docRef, {
                        phone: user.phoneNumber,
                      });
                      alert('회원가입이 완료되었습니다.');
                      window.location.href = '/';
                    })
                    .catch((error) => {
                      appVerifier.clear();
                      if (error.code === 'auth/invalid-verification-code') {
                        alert('인증 코드가 다릅니다. 인증 절차를 재시도 해 주세요.');
                      } else if (error.code === 'auth/account-exists-with-different-credential') {
                        appVerifier.render();
                        alert('이미 등록된 번호입니다.');
                        //window.location.href = '/';
                      } else {
                        alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');
                        console.log(error);
                      }
                    });
                }
              })
              .catch((error) => {
                console.log(error);
              });
          },
          'expired-callback': () => {
            alert('reCAPTCHA가 만료되었습니다. 다시 풀어주세요.');
            // reCAPTCHA 다시 렌더링
            appVerifier.render();
          },
        });

        // reCAPTCHA 인증을 요청합니다.
        appVerifier.render();
      } else {
        alert('휴대폰번호를 입력해 주세요.');
      }
    }
  };
  return (
    <div>
      <label>휴대폰번호:</label>
      <input type="number" name="phone" value={phone} onChange={handlePhoneChange} />
      <button onClick={addPhoneNumber}>인증</button>
      <Link to="/">건너뛰기</Link>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default JoinPhoneNumber;
