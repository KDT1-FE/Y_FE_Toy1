import styled from 'styled-components';
import { useState, ChangeEvent, useEffect } from 'react';
import { auth, db, storage } from '../../common/config';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import useBlobUrl from '../../hooks/useBlobUrl';
import JoinPhoneNumber from '../../components/JoinPhoneNumber';
import { Link } from 'react-router-dom';
import { useUser } from '../../common/UserContext';

interface UserType {
  name?: string;
  password?: string;
  passwordConfirm?: string;
  email?: string;
}

const Join = () => {
  const { updateUser } = useUser();
  const [user, setUser] = useState<User | null>(null);
  const [joinUser, setJoinUser] = useState<UserType>({
    name: '',
    password: '',
    passwordConfirm: '',
    email: '',
  });

  const [localPhotoUrl, setLocalPhotoUrl] = useState<File | null>(null);
  const { url, setFile } = useBlobUrl();

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const blobFile = files && files[0];
    if (blobFile) {
      setFile(blobFile);
      setLocalPhotoUrl(blobFile);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (value !== undefined) {
      setJoinUser((prev) => ({
        ...prev,
        [name]: value || '',
      }));
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
    // 폼 값 체크
    if (!joinUser.email) alert('이메일을 입력해 주세요.');
    if (!joinUser.name) alert('이름을 입력해 주세요.');
    if (!joinUser.password) alert('비밀번호를 입력해 주세요.');
    if (!joinUser.passwordConfirm) alert('비밀번호 확인을 입력해 주세요.');

    if (joinUser.email && joinUser.name && joinUser.password && joinUser.passwordConfirm) {
      // 패스워드 값 체크
      const result = await passwordCheck(joinUser.password, joinUser.passwordConfirm);

      // 패스워드값이 동일할 시
      if (result) {
        // 유저 아이디 생성
        await createUserWithEmailAndPassword(auth, joinUser.email, joinUser.password)
          .then((data) => {
            const newUser = data.user;

            // 이름 업데이트
            updateProfile(newUser, { displayName: joinUser.name }).then(async () => {
              // 유저 정보 db 저장
              const docRef = doc(db, 'user', newUser.uid);
              await setDoc(docRef, {
                email: newUser.email,
                name: newUser.displayName,
              });

              // 사진 첨부 했으면
              if (localPhotoUrl) {
                const photoRoute = ref(storage, 'user/' + newUser.uid);
                await uploadBytesResumable(photoRoute, localPhotoUrl)
                  .then(async () => {
                    const photoUrl = await getDownloadURL(photoRoute);
                    // 사진 url 업데이트
                    await updateProfile(newUser, { photoURL: photoUrl });
                    updateDoc(docRef, {
                      photoUrl: photoUrl,
                    });
                  })
                  .catch((error) => {
                    console.error(error);
                  });
              }

              await setUser(newUser); // 사용자 정보 업데이트
              const user = {
                name: newUser.displayName || '',
                uid: newUser.uid,
                email: newUser.email || '',
                photoUrl: newUser.photoURL || '',
                phone: newUser.phoneNumber || '',
                emailVerified: newUser.emailVerified,
              };
              updateUser(user);
            });
          })
          .catch((error) => {
            if (error.code === 'auth/email-already-in-use') {
              alert('이미 사용 중인 이메일 입니다.');
            } else if (error.code === 'auth/weak-password') {
              alert('비밀번호는 6자 이상으로 기입해 주세요.');
            } else if (error.code === 'auth/missing-email') {
              alert('이메일을 입력해 주세요.');
            } else if (error.code === 'auth/missing-password') {
              alert('비밀번호를 입력해 주세요.');
            } else {
              alert('정의되지 않은 오류입니다. 관리자에 문의해 주세요.');
            }
          });
      }
    }
  };

  return (
    <div>
      <h2>회원가입</h2>
      <div>
        <label>이메일:</label>
        <input type="email" name="email" value={joinUser.email} onChange={handleChange} />
      </div>
      <div>
        <label>이름:</label>
        <input type="text" name="name" value={joinUser.name} onChange={handleChange} />
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

      <PreviewImage
        style={url ? { backgroundImage: `url(${url})` } : { backgroundColor: `rgba(0,0,0,0.2)` }}
      ></PreviewImage>

      <div>
        <label>사진:</label>
        <input type="file" onChange={handlePhotoChange} />
      </div>
      <button onClick={handleJoin}>회원가입</button>

      {user && (
        <div>
          <JoinPhoneNumber user={user} /> <Link to="/">건너뛰기</Link>
        </div>
      )}
    </div>
  );
};

const PreviewImage = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.2);
  background-position: center center;
`;

export default Join;
