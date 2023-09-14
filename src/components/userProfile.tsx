import styled from 'styled-components';
import { auth } from '../common/config';
import { signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useUser } from '../common/UserContext';

const UserResult = () => {
  const { user } = useUser();

  const handleLogout = async () => {
    try {
      // 로그아웃
      await signOut(auth);
    } catch (error) {
      console.error('로그아웃 실패:', error);
    }
  };

  if (user) {
    return (
      <HeaderProfile>
        <div
          className="profileImg"
          style={
            user.photoUrl
              ? { backgroundImage: `url(${user.photoUrl})` }
              : { backgroundImage: `url(/src/assets/react.svg)` }
          }
        ></div>
        <div className="profileText">
          <p>{user.email}</p>
          <button onClick={handleLogout}>로그아웃</button>
        </div>
      </HeaderProfile>
    );
  } else {
    return (
      <HeaderProfile>
        <Link to="/login">로그인</Link>
      </HeaderProfile>
    );
  }
};

const HeaderProfile = styled.div`
  display: flex;
  font-size: 14px;

  .profileImg {
    width: 1.8rem;
    height: 1.8rem;
    border-radius: 50%;
    border: 1px solid ${({ theme }) => theme.colors.black};
    background-color: ${({ theme }) => theme.colors.border};
    opacity: 0.5;
  }

  .profileText {
    display: flex;
  }

  a {
    opacity: 0.5;
    &:hover {
      opacity: 1;
    }
  }
`;

export default UserResult;
