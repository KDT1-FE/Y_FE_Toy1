import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { GalleryMainContainer, ImageSection as ProfileSection } from './Project';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { BsPhone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { db } from '../../common/config';
import { collection, query, getDocs } from 'firebase/firestore';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';

interface UserProps {
  userId: string;
  name?: string;
  email?: string;
  phone?: string;
  photoUrl?: string;
}

const Member = () => {
  const [userData, setUserData] = useState<Array<UserProps>>();

  const fetchUserData = async () => {
    try {
      const getUserQuery = query(collection(db, 'user'));
      const querySnapshot = await getDocs(getUserQuery);
      const fetchedData: Array<UserProps> = [];

      querySnapshot.forEach((doc) => {
        const userId = doc.id;
        const data = doc.data();
        fetchedData.push({ ...data, userId });
      });
      setUserData(fetchedData);
    } catch (error) {
      console.log('User Data Fetch 에러: ', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <CategoryTitle>멤버 소개</CategoryTitle>
        <BreadCrumb>갤러리 &gt; 멤버 &gt; 멤버 소개</BreadCrumb>
      </CategoryTitleSection>
      <ProfileSection>
        {userData?.map((item, index) => {
          return <ImageWrapper key={index} userData={item} />;
        })}
      </ProfileSection>
    </GalleryMainContainer>
  );
};

export default Member;

const ImageWrapper = ({ userData }: { userData: UserProps }) => {
  return (
    <MainDiv style={{ display: userData.name ? '' : 'none' }}>
      <ImageDiv style={{ backgroundImage: `url(${userData.photoUrl})` }} />
      <NameDiv>{userData.name}</NameDiv>
      <InfoDiv>
        {userData.phone && <BsPhone style={{ flexShrink: '0' }} />}
        {userData.phone && `${formatPhoneNumber(userData.phone)}`}
      </InfoDiv>
      <InfoDiv style={{ alignItems: 'flex-start' }}>
        {userData.email && <AiOutlineMail style={{ flexShrink: '0', marginTop: '5px' }} />}
        {userData.email}
      </InfoDiv>
    </MainDiv>
  );
};

const MainDiv = styled.div`
  width: 30%;
  margin-bottom: 5%;
  padding-bottom: 18px;
  border: 1px solid #e9e9e9;
  border-radius: 4px;
`;

const ImageDiv = styled.div`
  width: 100%;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
`;

const NameDiv = styled.div`
  text-align: center;
  font-size: 18px;
  margin: 18px 0 14px;
  font-weight: 700;
`;

const InfoDiv = styled.div`
  padding: 0 18px;
  display: flex;
  gap: 4px;
  align-items: center;
  word-break: break-word;
`;
// overflow: scroll;
