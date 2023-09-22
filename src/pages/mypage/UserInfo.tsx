import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { auth } from '../../common/config';
import { onAuthStateChanged, User } from 'firebase/auth';
import CommuteTable from '../../components/CommuteTable';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { BsPhone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const formatDate = (date: string) => {
    const utcDate = new Date(date);
    const kstMilliseconds = 1000;
    const kstSeconds = 60;
    const kstMinutes = 60;
    const kstHours = 9;
    const kstDate = new Date(
      utcDate.getTime() + kstHours * kstMinutes * kstSeconds * kstMilliseconds,
    );
    const year = kstDate.getUTCFullYear();
    const month = String(kstDate.getUTCMonth() + 1).padStart(2, '0');
    const day = String(kstDate.getUTCDate()).padStart(2, '0');
    const hours = String(kstDate.getUTCHours()).padStart(2, '0');
    const minutes = String(kstDate.getUTCMinutes()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}`;
    return formattedDate;
  };

  const lastSignInTime = user?.metadata.lastSignInTime;
  const lastSign = lastSignInTime ? formatDate(lastSignInTime) : undefined;
  const creationTime = user?.metadata.creationTime;
  const creation = creationTime ? formatDate(creationTime) : undefined;

  return (
    <MypageMainContainer>
      <CategoryTitleSection>
        <CategoryTitle>마이페이지</CategoryTitle>
        <BreadCrumb>마이페이지 &gt; 회원 정보</BreadCrumb>
      </CategoryTitleSection>
      <InfoTextSection>
        <h2>{user?.displayName}</h2>
        <p className="email">
          <AiOutlineMail style={{ flexShrink: '0' }} />
          {user?.email}
        </p>
        {user?.phoneNumber && (
          <p className="phone">
            <BsPhone />
            {formatPhoneNumber(user.phoneNumber)}
          </p>
        )}
      </InfoTextSection>
      <InfoBoxSection>
        <p>{lastSign}</p>
        <p>{creation}</p>
        {user?.emailVerified ? <p>이메일 인증 완료</p> : <p>이메일 인증 미완료</p>}
      </InfoBoxSection>
      <CommuteTable />
    </MypageMainContainer>
  );
};

const MypageMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
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

const InfoTextSection = styled.div`
h2 {
    font-size: 18px;
    font-weight: bold;
}
p {
    font-size:14px;
}

}
`;
const InfoBoxSection = styled.div``;

export default UserInfo;
