import styled from 'styled-components';
import { useState, ChangeEvent, useEffect } from 'react';
import { auth, db, storage } from '../../common/config';
import {
  onAuthStateChanged,
  User,
  updateProfile,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useBlobUrl from '../../hooks/useBlobUrl';
import JoinPhoneNumber from '../../components/JoinPhoneNumber';

const Modify = () => {
  const [localPhotoUrl, setLocalPhotoUrl] = useState<File | null>(null);
  const { url, setFile } = useBlobUrl();

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    console.log(files);
    const blobFile = files && files[0];
    if (blobFile) {
      setFile(blobFile);
      setLocalPhotoUrl(blobFile);
    }
  };

  const [name, setName] = useState('');

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const handleModify = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // 유저 정보 확인
    if (user) {
      const docRef = doc(db, 'user', user.uid);
      if (name) {
        await updateProfile(user, { displayName: name });
        await updateDoc(docRef, {
          name: name,
        });
      }

      if (localPhotoUrl) {
        const photoRoute = ref(storage, 'user/' + user.uid);
        await uploadBytesResumable(photoRoute, localPhotoUrl).then(async () => {
          const photoUrl = await getDownloadURL(photoRoute);
          // 사진 url 업데이트
          await updateProfile(user, { photoURL: photoUrl });
          await updateDoc(docRef, {
            photoUrl: photoUrl,
          });
        });
      }

      alert('회원 정보 수정이 완료되었습니다.');
      window.location.reload();
    } else {
      alert('회원 정보가 없습니다. 관리자에 문의해주세요.');
    }
  };

  const reAuthLogin = () => {
    return new Promise((resolve, reject) => {
      if (user?.email) {
        const password = window.prompt('비밀번호를 입력해 주세요.');
        if (password) {
          const credential = EmailAuthProvider.credential(user.email, password);
          reauthenticateWithCredential(user, credential)
            .then(() => {
              console.log('재인증 성공');
              resolve(true);
            })
            .catch((error) => {
              console.log(error);
              reject(false);
            });
        } else {
          reject(false); // 사용자가 비밀번호를 입력하지 않은 경우
        }
      } else {
        reject(false); // 사용자의 이메일이 없는 경우
      }
    });
  };

  const handlePassword = async () => {
    if (user?.email) {
      await reAuthLogin();
      sendPasswordResetEmail(auth, user?.email)
        .then(() => {
          alert(`${user.displayName}님의 이메일 주소로 비밀번호 변경 url을 전송하였습니다.`);
        })
        .catch(() => {
          alert('비밀번호 변경 이메일 전송에 실패하였습니다.');
        });
    } else {
      alert('회원 정보가 없습니다. 관리자에 문의해주세요.');
    }
  };

  const handleEmailConfirm = () => {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          alert('인증 이메일을 전송했습니다. 이메일을 확인해 주세요.');
        })
        .catch(() => {
          alert('인증 이메일 전송에 실패하였습니다.');
        });
    } else {
      alert('회원 정보가 없습니다. 관리자에 문의해주세요.');
    }
  };

  const handleDeleteUser = async () => {
    if (user) {
      const result = await window.confirm('회원 탈퇴하시겠습니까?');
      if (result) {
        const reAuth = await reAuthLogin();
        if (reAuth) {
          await deleteUser(user)
            .then(() => {
              alert('회원 탈퇴가 완료되었습니다.');
              window.location.href = '/';
            })
            .catch((error) => {
              alert('회원 탈퇴에 실패하였습니다. 관리자에 문의해주세요.');
              console.log(error);
            });
        }
      }
    } else {
      alert('회원 정보가 없습니다. 관리자에 문의해주세요.');
    }
  };

  return (
    <MypageMainContainer>
      <CategoryTitleSection>
        <CategoryTitle>마이페이지</CategoryTitle>
        <BreadCrumb>마이페이지 &gt; 회원 정보 수정</BreadCrumb>
      </CategoryTitleSection>

      <MypageSubContainer>
        <ButtonSection>
          {user?.emailVerified && (
            <button className="button--password" onClick={handlePassword}>
              비밀번호 변경
            </button>
          )}
          {user && !user.emailVerified && (
            <button className="button--email" onClick={handleEmailConfirm}>
              이메일 인증
            </button>
          )}
          <button className="button--delete" onClick={handleDeleteUser}>
            회원탈퇴
          </button>
        </ButtonSection>
        <form onSubmit={handleModify}>
          <InfoSection>
            <p>회원 사진</p>
            <PhotoContainer>
              <PreviewImage
                style={url ? { backgroundImage: `url(${url})` } : { backgroundImage: `none` }}
              ></PreviewImage>

              <label>사진</label>
              <input type="file" onChange={handlePhotoChange} />
            </PhotoContainer>

            <InputContainer>
              <label>이름</label>
              <input type="text" name="name" value={name} onChange={handleNameChange} />
            </InputContainer>
            <button type="submit">수정</button>
          </InfoSection>
        </form>
        <PhoneSection>
          <JoinPhoneNumber user={user} />
        </PhoneSection>
      </MypageSubContainer>
    </MypageMainContainer>
  );
};
const MypageMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
`;

const MypageSubContainer = styled.div`
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
      grid-column: 1 / span 1;
    }
  }
`;
const PhoneSection = styled.div``;

const InfoSection = styled.div`
  p {
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
  }
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
const ButtonSection = styled.div`
  margin-bottom: 10px;
  grid-column: 1 / span 2;
  button {
    font-family: 'Noto Sans KR';
    width: auto;
    padding: 0 20px;
    cursor: pointer;
    height: 47px;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    color: rgb(255, 255, 255);
    text-align: center;
    line-height: 47px;
  }
  button.button--email,
  button.button--password {
    background-color: rgb(50, 103, 177);
  }
  button.button--delete {
    margin-left: 5px;
    background-color: #333;
  }
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
  display: flex;
  align-items: center;
  flex-direction: column;
  input {
    width: 300px;
    margin-top: 10px;
  }
  label {
    display: none;
  }
`;

const PreviewImage = styled.div`
  width: 300px;
  height: 300px;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: rgba(0, 0, 0, 0.2);
  background-position: center center;
`;

export default Modify;
