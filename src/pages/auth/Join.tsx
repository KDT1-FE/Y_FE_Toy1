import styled from 'styled-components';
import { useState, ChangeEvent, useEffect } from 'react';
import { auth, db, storage } from '../../common/config';
import { createUserWithEmailAndPassword, updateProfile, User } from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, setDoc, updateDoc } from 'firebase/firestore';
import useBlobUrl from '../../hooks/useBlobUrl';
import JoinPhoneNumber from '../../components/JoinPhoneNumber';
import LoadingSpinner from '../../components/LoadingSpinner';

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
  const [isLoading, setIsLoading] = useState(false);

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

  const handleJoin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
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
              setIsLoading(false);
            });
          })
          .catch((error) => {
            setIsLoading(false);
            if (error.code === 'auth/email-already-in-use') {
              alert('이미 사용 중인 이메일 입니다.');
            } else if (error.code === 'auth/weak-password') {
              alert('비밀번호는 6자 이상으로 기입해 주세요.');
            } else if (error.code === 'auth/missing-email') {
              alert('이메일을 입력해 주세요.');
            } else if (error.code === 'auth/missing-password') {
              alert('비밀번호를 입력해 주세요.');
            } else {
              alert(error);
              console.log(error);
            }
          });
      }
    }
  };

  return (
    <AuthMainContainer>
      {isLoading && <LoadingSpinner />}
      <CategoryTitleSection>
        <CategoryTitle>회원가입</CategoryTitle>
        <BreadCrumb>회원인증 &gt; 회원가입</BreadCrumb>
      </CategoryTitleSection>
      <form onSubmit={handleJoin}>
        <PhotoSection>
          <p>회원 사진</p>
          <PhotoContainer>
            <PreviewImage
              style={url ? { backgroundImage: `url(${url})` } : { backgroundImage: `none` }}
            ></PreviewImage>

            <label>사진</label>
            <input type="file" onChange={handlePhotoChange} />
          </PhotoContainer>
        </PhotoSection>
        <InfoSection>
          <InputContainer>
            <label>이메일</label>
            <input
              required
              type="email"
              name="email"
              value={joinUser.email}
              onChange={handleChange}
              placeholder="이메일을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <label>이름</label>
            <input
              required
              type="text"
              name="name"
              value={joinUser.name}
              onChange={handleChange}
              placeholder="이름을 입력해주세요."
            />
          </InputContainer>
          <InputContainer>
            <label>비밀번호</label>
            <input
              required
              type="password"
              name="password"
              value={joinUser.password}
              onChange={handleChange}
              placeholder="비밀번호를 입력해주세요."
            />
            <span>비밀번호는 6자 이상으로 입력해주세요.</span>
          </InputContainer>
          <InputContainer>
            <label>비밀번호확인</label>
            <input
              required
              type="password"
              name="passwordConfirm"
              value={joinUser.passwordConfirm}
              onChange={handleChange}
              placeholder="비밀번호 확인을 입력해주세요."
            />
            <span>비밀번호 확인 값은 비밀번호 값과 동일하게 입력해주세요.</span>
          </InputContainer>
          <button type="submit">회원가입</button>
        </InfoSection>
      </form>

      {user && (
        <PhoneSection>
          <JoinPhoneNumber user={user} />
        </PhoneSection>
      )}
    </AuthMainContainer>
  );
};

const AuthMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;

  > form {
    margin-top: 15px;
    display: grid;
    grid-template: auto / repeat(2, 45%);
    justify-content: space-between;
    gap: 10px;

    @media screen and (max-width: 1150px) {
      margin-bottom: 20px;
      grid-template: auto / repeat(1, 100%);

      > div {
        width: 100%;
      }
    }
  }
`;
const InfoSection = styled.div`
  button {
    font-family: 'Noto Sans KR';
    width: 100%;
    min-width: 300px;
    cursor: pointer;
    height: 47px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 47px;
    background-color: rgb(50, 103, 177);
  }
`;
const PhotoSection = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
  }
`;
const PhoneSection = styled.div`
  margin-top: 50px;
  grid-column: 1 / span 1;
  border: 1px solid #9d9c9c30;
  padding: 40px;
  border-radius: 4px;
`;
const CategoryTitleSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CategoryTitle = styled.h1`
  font-size: 32px;
`;
const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;

const InputContainer = styled.div`
  margin-bottom: 20px;
  label {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 30px;
  }

  input {
    font-family: 'Noto Sans KR';
    margin-top: 10px;
    width: 100%;
    padding: 10px;
    outline: none;
    border-radius: 4px;
    border: 1px solid #9d9c9c30;
  }

  span {
    font-size: 12px;
    text-align: right;
    color: gray;
  }
`;

const PhotoContainer = styled.div`
  label {
    display: none;
  }
`;

const PreviewImage = styled.div`
  position: relative;
  margin-bottom: 15px;
  width: 300px;
  min-width: 200px;
  max-width: 500px;
  aspect-ratio: 1;
  background-color: lightgray;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 0.1px solid #9d9c9c30;
`;

export default Join;
