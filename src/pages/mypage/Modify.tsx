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
import { doc, updateDoc, deleteDoc } from 'firebase/firestore';
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

  const handleModify = async () => {
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
    <div>
      <h1>회원 정보 수정</h1>

      {user?.emailVerified && <button onClick={handlePassword}>비밀번호 변경</button>}
      {user && !user.emailVerified && <button onClick={handleEmailConfirm}>이메일 인증</button>}
      <button onClick={handleDeleteUser}>회원탈퇴</button>

      <div>
        <label>이름:</label>
        <input type="text" name="name" value={name} onChange={handleNameChange} />
      </div>

      <PreviewImage
        style={
          url
            ? { backgroundImage: `url(${url})` }
            : user?.photoURL
            ? { backgroundImage: `url(${user?.photoURL})` }
            : { backgroundColor: `rgba(0,0,0,0.2)` }
        }
      ></PreviewImage>

      <div>
        <label>사진:</label>
        <input type="file" onChange={handlePhotoChange} />
      </div>

      <button onClick={handleModify}>수정</button>

      <JoinPhoneNumber user={user} />
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

export default Modify;
