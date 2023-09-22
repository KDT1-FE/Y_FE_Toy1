import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { auth } from '../../common/config';
import {
  onAuthStateChanged,
  User,
  sendPasswordResetEmail,
  sendEmailVerification,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from 'firebase/auth';
import CommuteTable from '../../components/CommuteTable';
import { formatPhoneNumber } from '../../utils/formatPhoneNumber';
import { BsPhone } from 'react-icons/bs';
import { AiOutlineMail } from 'react-icons/ai';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';
import { SubPageContainer } from '../../utils/CommonDesign';
import { SmallButtonBlue, SmallButtonDarkGray, SmallButtonGray } from '../../utils/CommonDesign';

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
    if (user?.emailVerified) {
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
    } else {
      alert('이메일 인증을 먼저 진행해주세요.');
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
    <SubPageContainer>
      <CategoryTitleSection>
        <CategoryTitle>회원 정보</CategoryTitle>
        <BreadCrumb>마이페이지 &gt; 회원 정보</BreadCrumb>
      </CategoryTitleSection>
      <InfoTextSection>
        <TextSection>
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
        </TextSection>
        <ButtonSection>
          {user && !user.emailVerified && (
            <SmallButtonBlue className="button--email" onClick={handleEmailConfirm}>
              이메일 인증
            </SmallButtonBlue>
          )}
          <SmallButtonGray
            className={user?.emailVerified ? 'button--password confirm' : 'button--password'}
            onClick={handlePassword}
          >
            비밀번호 변경
          </SmallButtonGray>
          <SmallButtonDarkGray className="button--delete" onClick={handleDeleteUser}>
            회원탈퇴
          </SmallButtonDarkGray>
          <p>비밀번호는 이메일 인증이 완료된 이후에 변경 가능합니다.</p>
        </ButtonSection>
      </InfoTextSection>
      <InfoBoxSection>
        <ul>
          <li>
            <strong>최초 가입일</strong>
            <p>{creation}</p>
          </li>
          <li>
            <strong>최종 방문일</strong>
            <p>{lastSign}</p>
          </li>
          <li>
            <strong>이메일 인증</strong>
            {user?.emailVerified ? <p>이메일 인증 완료</p> : <p>이메일 인증 미완료</p>}
          </li>
        </ul>
      </InfoBoxSection>
      <CommuteTable />
    </SubPageContainer>
  );
};

const InfoTextSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
  align-items: center;
  @media screen and (max-width: 700px) {
    display: block;
  }
`;
const TextSection = styled.div`
  h2 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 5px;
  }
  p svg {
    width: 30px;
  }
`;

const ButtonSection = styled.div`
  text-align: right;
  button.button--email,
  button.button--password {
    margin-right: 5px;
  }
  button.button--password.confirm {
    background-color: rgb(50, 103, 177);
    cursor: pointer;
    color: #fff;
  }

  button.button--password {
    cursor: default;
  }

  p {
    display: block;
    font-size: 12px;
    color: gray;
    text-align: right;
    margin-top: 5px;
  }

  @media screen and (max-width: 700px) {
    margin-top: 10px;

    p {
      text-align: left;
    }
    button {
      padding: 0 10px;
    }
  }
`;

const InfoBoxSection = styled.div`
  margin-top: 20px;
  ul {
    border: 1px solid ${(props) => props.theme.colors.border};
    border-radius: 4px;
    display: flex;
  }
  li {
    width: 33.33%;
    border-left: 1px solid ${(props) => props.theme.colors.border};
    box-sizing: border-box;
    padding: 15px 25px;
  }
  li:first-child {
    border-left: none;
  }
  strong {
    font-size: 16px;
    font-weight: bold;
  }
  p {
    font-size: 14px;
    color: gray;
  }

  @media screen and (max-width: 700px) {
    ul {
      display: block;
    }
    li {
      width: 100%;
      border-left: 0;
      border-bottom: 1px solid ${(props) => props.theme.colors.border};
    }
    li:last-child {
      border-bottom: 0;
    }
  }
`;

export default UserInfo;
