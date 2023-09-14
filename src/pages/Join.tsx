import { useState, ChangeEvent } from 'react';
import { auth } from '../common/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
} from 'firebase/auth';
import { useUser } from '../common/UserContext';

const Join = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [uid, setUid] = useState('');
  const [photoUrl, setPhotoUrl] = useState('');
  const { updateUser } = useUser(); // UserContext에서 updateUser 함수 불러오기

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

  const handleJoin = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password).then((result) => {
        updateProfile(result.user, {
          displayName: name,
          photoURL: photoUrl,
        });
        new RecaptchaVerifier(auth, 'recaptcha-container', {
          size: 'normal',
          callback: (result: any) => {
            const credential = PhoneAuthProvider.credential(result.verificationId, result.code);
            updatePhoneNumber(result.user, credential);
          },
          'expired-callback': () => {
            // Response expired. Ask user to solve reCAPTCHA again.
          },
        });
      });
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

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
