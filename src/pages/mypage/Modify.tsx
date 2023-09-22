import styled from 'styled-components';
import { useState, ChangeEvent, useEffect, FormEvent } from 'react';
import { auth, db, storage } from '../../common/config';
import { onAuthStateChanged, User, updateProfile } from 'firebase/auth';
import { uploadBytesResumable, ref, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import useBlobUrl from '../../hooks/useBlobUrl';
import JoinPhoneNumber from '../../components/JoinPhoneNumber';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { SubPageContainer } from '../../utils/CommonDesign';

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

  const handleModify = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
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

  return (
    <SubPageContainer>
      <CategoryTitleSection>
        <CategoryTitle>회원 정보 수정</CategoryTitle>
        <BreadCrumb>마이페이지 &gt; 회원 정보 수정</BreadCrumb>
      </CategoryTitleSection>

      <MypageSubContainer>
        <form onSubmit={handleModify}>
          <InfoSection>
            <p>회원 사진</p>
            <PhotoContainer>
              <PreviewImage
                style={
                  url
                    ? { backgroundImage: `url(${url})` }
                    : user?.photoURL
                    ? { backgroundImage: `url(${user?.photoURL})` }
                    : { backgroundColor: 'lightgray' }
                }
              ></PreviewImage>

              <label>사진</label>
              <input type="file" onChange={handlePhotoChange} />
            </PhotoContainer>

            <InputContainer>
              <label>이름</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleNameChange}
                placeholder="이름을 입력해주세요."
              />
            </InputContainer>
            <button type="submit">수정</button>
          </InfoSection>
        </form>
        <PhoneSection>
          <JoinPhoneNumber user={user} />
        </PhoneSection>
      </MypageSubContainer>
    </SubPageContainer>
  );
};

const MypageSubContainer = styled.div`
  margin-top: 15px;
  display: grid;
  grid-template: auto / repeat(2, 45%);
  justify-content: space-between;
  gap: 10px;

  @media screen and (max-width: 1150px) {
    margin-bottom: 20px;
    grid-template: auto / repeat(1, 100%);
    gap: 20px;

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
    &:hover {
      background-color: #2c5b96;
    }
  }
`;

const InputContainer = styled.div`
  margin: 20px 0;
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
    border: 1px solid ${(props) => props.theme.colors.border};
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
  background-color: white;
  background-position: center center;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
`;

export default Modify;
