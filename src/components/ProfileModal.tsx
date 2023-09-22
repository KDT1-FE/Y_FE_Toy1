import styled from 'styled-components';
import { useUser } from '../common/UserContext';
import { signOut } from 'firebase/auth';
import { auth } from '../common/config';
import { Link } from 'react-router-dom';
import { SmallButtonDarkGray } from '../utils/CommonDesign';

interface Props {
  isModalOpen: boolean;
  toggleModal: () => void;
  uid: string | undefined;
}

const handleLogout = async () => {
  try {
    // 로그아웃
    await signOut(auth);
    window.location.href = '/';
  } catch (error) {
    console.error('로그아웃 실패:', error);
  }
};

const ProfileModal = ({ isModalOpen, toggleModal }: Props) => {
  const { user } = useUser();
  // useRecoilState로 commuteInfo를 가져오기 vs commuteInfo를 props로 받기

  return (
    <>
      {user && (
        <>
          <Overlay onClick={toggleModal} className={isModalOpen ? 'open' : ''} />
          <ModalContainer className={isModalOpen ? 'open' : ''} id="commute-modal">
            <ProfileImage
              style={
                user.photoUrl
                  ? { backgroundImage: `url(${user.photoUrl})` }
                  : { backgroundImage: `url(/src/assets/react.svg)` }
              }
            />
            <ProfileText>
              <TextName>{user.name}</TextName>
              <TextEmail>{user.email}</TextEmail>
              <ButtonContainer>
                <Link onClick={toggleModal} to="/mypage">
                  마이페이지
                </Link>
                <SmallButtonDarkGray onClick={handleLogout}>로그아웃</SmallButtonDarkGray>
              </ButtonContainer>
            </ProfileText>
          </ModalContainer>
        </>
      )}
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  display: none;
  z-index: 90;
  top: 0;
  left: 0;
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.2);

  &.open {
    display: block;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1.5rem 2rem;

  min-width: 250px;
  max-width: 300px;

  border: ${(props) => props.theme.colors.card.border};
  border-radius: 0.6rem;
  box-shadow: ${(props) => props.theme.colors.card.shadow};

  background-color: #ffffff;

  visibility: hidden;
  opacity: 0;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    visibility 0.2s ease;

  &.open {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    visibility: visible;
  }
`;

const ProfileImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 100%;
  background-position: center center;
  background-size: cover;
  background-color: ${(props) => props.theme.colors.border};
`;
const ProfileText = styled.div`
  text-align: center;
  margin-top: 10px;
`;

const TextName = styled.div`
  font-size: 16px;
  font-weight: bold;
`;
const TextEmail = styled.div``;
const ButtonContainer = styled.div`
  margin-top: 15px;
  display: flex;
  gap: 5px;
  a {
    font-family: 'Noto Sans KR';
    width: auto;
    padding: 0 15px;
    cursor: pointer;
    height: 35px;
    border: none;
    border-radius: 8px;
    font-size: 15px;
    font-weight: 500;
    color: #fff;
    text-align: center;
    line-height: 35px;
    background-color: rgb(50, 103, 177);
    display: inline-block;
    min-width: 99px;
    &:hover {
      background-color: #2c5b96;
    }
  }
  button {
    min-width: 85.2px;
  }
`;

export default ProfileModal;
