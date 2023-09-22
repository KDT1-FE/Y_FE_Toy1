import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useUser } from '../common/UserContext';
import ProfileModal from './ProfileModal';

const UserResult = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const { user } = useUser();
  const uid = user?.uid;

  function toggleModal() {
    setModalOpen(!isModalOpen);
  }

  const location = window.location.pathname;

  if (user) {
    return (
      <HeaderProfile>
        <ProfileModal
          uid={uid}
          isModalOpen={location === '/login' || location === '/join' ? false : isModalOpen}
          toggleModal={toggleModal}
        />
        <button
          className="btn"
          onClick={toggleModal}
          aria-haspopup="dialog"
          aria-labelledby="profile-modal"
          aria-expanded={isModalOpen}
        >
          <div
            className="profileImg"
            style={
              user.photoUrl
                ? { backgroundImage: `url(${user.photoUrl})` }
                : { backgroundImage: `url(/src/assets/react.svg)` }
            }
          ></div>
        </button>
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
    border: 1px solid #ddd;
    background-color: ${(props) => props.theme.colors.border};
    background-size: cover;
    opacity: 0.8;
    &:hover {
      opacity: 1;
      border: 1px solid #666;
    }
  }

  .profileText {
    display: flex;
  }

  > a {
    font-size: 14px;
    color: gray;
    &:hover {
      text-decoration: underline;
    }
  }
`;

export default UserResult;
