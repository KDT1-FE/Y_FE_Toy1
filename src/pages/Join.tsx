import { useState, ChangeEvent, useEffect } from 'react';
import { auth } from '../common/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  User,
} from 'firebase/auth';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');

  const defaultUser: User | null = null;
  const [user, setUser] = useState<User | null>(defaultUser);

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handlePasswordConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPasswordConfirm(e.target.value);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhone(e.target.value);
  };

  const handlePhotoUrlChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPhotoUrl(e.target.value);
  };

  const passwordCheck = (password: string, passwordCheck: string) => {
    if (password === passwordCheck) {
      return true;
    } else {
      alert('비밀번호와 비밀번호 확인의 값이 다릅니다.');
      return false;
    }
  };

  const handleJoin = async () => {
    try {
      const result = await passwordCheck(password, passwordConfirm);
      if (result) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const newUser = userCredential.user;

        // 프로필 업데이트
        await updateProfile(newUser, {
          displayName: name,
          photoURL: photoUrl,
        });

        setUser(newUser); // 사용자 정보 상태 변수 업데이트
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  useEffect(() => {
    // RecaptchaVerifier 초기화
    if (user) {
      // 사용자 정보가 있을 때만 실행
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (recaptchaToken: string) => {
          // Callback 로직
          const phoneNumber = `+82${phone}`;
          const provider = new PhoneAuthProvider(auth);
          provider
            .verifyPhoneNumber(phoneNumber, appVerifier)
            .then((verificationId) => {
              appVerifier.clear();
              const code = window.prompt('인증 코드를 입력하세요:');
              if (code) {
                const credential = PhoneAuthProvider.credential(verificationId, code);
                if (verificationId === code) {
                  return updatePhoneNumber(user, credential);
                } else {
                  window.location.reload();
                  alert('인증 코드를 다시 확인해 주세요.');
                }
              }
            })
            .catch((error) => {
              if (error.code === 'auth/invalid-verification-code') {
              } else if (error.code === 'auth/account-exists-with-different-credential') {
                alert('이미 등록된 번호입니다.');
              } else alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');
            });
        },
        'expired-callback': () => {
          alert('reCAPTCHA가 만료되었습니다. 다시 풀어주세요.');
          // reCAPTCHA 다시 렌더링
          appVerifier.render();
        },
      });

      console.log(user);

      // reCAPTCHA 인증을 요청합니다.
      appVerifier.render();
    }
  }, [phone, user]);

  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <label>이메일:</label>
        <input type="email" value={email} onChange={handleEmailChange} />
      </div>
      <div>
        <label>비밀번호:</label>
        <input type="password" value={password} onChange={handlePasswordChange} />
      </div>
      <div>
        <label>비밀번호확인:</label>
        <input type="password" value={passwordConfirm} onChange={handlePasswordConfirmChange} />
      </div>
      <div>
        <label>이름:</label>
        <input type="text" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label>휴대폰번호:</label>
        <input type="number" value={phone} onChange={handlePhoneChange} />
        <div id="recaptcha-container"></div>
      </div>
      <div>
        <label>사진:</label>
        <input type="file" value={photoUrl} onChange={handlePhotoUrlChange} />
      </div>
      <button onClick={handleJoin}>회원가입</button>
    </div>
  );
};

export default Join;
