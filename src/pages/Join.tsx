import { useState, ChangeEvent, useEffect } from 'react';
import { auth, db, storage } from '../common/config';
import {
  createUserWithEmailAndPassword,
  updateProfile,
  updatePhoneNumber,
  RecaptchaVerifier,
  PhoneAuthProvider,
  User,
} from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import useBlobUrl from '../hooks/useBlobUrl';
import { uploadImage } from '../utils/firebaseUtils';

interface UserType {
  name?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
  phone?: string;
}

const Join = () => {
  const [user, setUser] = useState<User | null>(null);
  const [joinUser, setJoinUser] = useState<UserType>({
    name: '',
    password: '',
    passwordConfirm: '',
    email: '',
    phone: '',
  });

  const [photoURL, setPhotoUrl] = useState<File | null>(null);
  const { url, setFile } = useBlobUrl();

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const blobFile = files && files[0];
    if (blobFile) {
      setFile(blobFile);
      setPhotoUrl(blobFile);

      uploadImage(blobFile);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== undefined) {
      setJoinUser((prev) => ({
        ...prev,
        [name]: value || '',
      }));
      console.log(joinUser);
    }
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
      if (joinUser.password && joinUser.passwordConfirm && joinUser.email) {
        const result = await passwordCheck(joinUser.password, joinUser.passwordConfirm);
        if (result) {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            joinUser.email,
            joinUser.password,
          );
          const newUser = userCredential.user;

          // 이름 업데이트
          await updateProfile(newUser, { displayName: joinUser.name });

          if (photoURL) {
            const photoRoute = ref(storage, 'user/' + newUser.uid);
            await uploadBytesResumable(photoRoute, photoURL);
            const photoUrl = await getDownloadURL(photoRoute);
            // 사진 url 업데이트
            await updateProfile(newUser, { photoURL: photoUrl });
          }

          setUser(newUser); // 사용자 정보 상태 변수 업데이트
        }
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  useEffect(() => {
    // 사용자 정보가 있을 때만 실행
    if (user && joinUser.phone) {
      const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'normal',
        callback: (recaptchaToken: string) => {
          // Callback 로직
          const phoneNumber = `+82${joinUser.phone}`;
          const provider = new PhoneAuthProvider(auth);
          provider
            .verifyPhoneNumber(phoneNumber, appVerifier)
            .then((verificationId) => {
              const code = window.prompt('인증 코드를 입력하세요:');
              if (code) {
                const credential = PhoneAuthProvider.credential(verificationId, code);
                console.log(credential);

                return updatePhoneNumber(user, credential)
                  .then(() => {
                    appVerifier.clear();
                    const docRef = doc(db, 'user', user.uid);
                    setDoc(docRef, {
                      name: user.displayName,
                      phone: user.phoneNumber,
                      photoUrl: user.photoURL,
                    });
                  })
                  .catch((error) => {
                    if (error.code === 'auth/invalid-verification-code') {
                      alert('인증 코드를 다시 확인해 주세요.');
                    }
                  });
              }
            })
            .catch((error) => {
              if (error.code === 'auth/account-exists-with-different-credential') {
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
  }, [joinUser.phone, user]);

  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <label>이메일:</label>
        <input type="email" name="email" value={joinUser.email} onChange={handleChange} />
      </div>
      <div>
        <label>비밀번호:</label>
        <input type="password" name="password" value={joinUser.password} onChange={handleChange} />
      </div>
      <div>
        <label>비밀번호확인:</label>
        <input
          type="password"
          name="passwordConfirm"
          value={joinUser.passwordConfirm}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>이름:</label>
        <input type="text" name="name" value={joinUser.name} onChange={handleChange} />
      </div>
      <div>
        <label>휴대폰번호:</label>
        <input type="number" name="phone" value={joinUser.phone} onChange={handleChange} />
        <div id="recaptcha-container"></div>
      </div>
      <div>
        <label>사진:</label>
        <input type="file" onChange={handlePhotoChange} />
      </div>
      <button onClick={handleJoin}>회원가입</button>
    </div>
  );
};

export default Join;
