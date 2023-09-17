import styled from 'styled-components';
import { BsCalendar4Event } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import CommuteModal from './CommuteModal';
import UserResult from './UserProfile';

const Header = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <Container>
      <Navbar>
        <div className="nav-wrapper">
          <div className="title">
            <Link to={'/'}>App Logo</Link>
          </div>
          <InputWrapper>
            <div className="icon">
              <button className="btn">
                <CiSearch size="20" />
              </button>
            </div>
            <input type="text" />
          </InputWrapper>
        </div>

        <div className="nav-wrapper">
          <div className="icon">
            <CommuteModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
            <button
              className="btn"
              onClick={toggleModal}
              aria-haspopup="dialog"
              aria-labelledby="commute-modal"
              aria-expanded={isModalOpen}
            >
              <BsCalendar4Event size="21" />
            </button>
          </div>

          <div className="icon">
            <UserResult />
          </div>
        </div>
      </Navbar>
    </Container>
  );
};

const Container = styled.header`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 56px;
  padding: 0 2rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  z-index: 20;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  .nav-wrapper {
    display: flex;
    align-items: center;

    .title {
      font-size: ${(props) => props.theme.fontSize.title};
      font-weight: 600;

      margin-right: 1rem;
    }
  }

  .icon {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;

    button.btn {
      display: flex;
      justify-content: center;
      align-items: center;

      padding-inline: 0.6rem;

      border: none;
      outline: none;
      background-color: transparent;

      cursor: pointer;

      &:hover {
      }
    }
  }
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  width: 240px;

  background-color: #f9f9f9;
  border-radius: 20px;

  input[type='text'] {
    width: 100%;
    padding: 0.8rem 1rem 0.8rem 0;
    border: none;
    outline: none;
    background-color: transparent;

    font-size: ${(props) => props.theme.fontSize.text};
    font-weight: 400;
  }
`;

export default Header;
