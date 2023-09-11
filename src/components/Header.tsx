import styled from 'styled-components';
import { BsCalendar4Event } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';

const Header = () => {
  return (
    <Container>
      <Navbar>
        <InputWrapper>
          <div className="icon">
            <button>
              <CiSearch size="20" />
            </button>
          </div>
          <input type="text" />
        </InputWrapper>
        <div className="wrapper">
          <div className="icon">
            <button aria-haspopup="true">
              <BsCalendar4Event size="21" />
            </button>
          </div>

          <div className="icon">
            <button aria-haspopup="true">
              <div className="profile"></div>
            </button>
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

  z-index: 11;
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  .wrapper {
    display: flex;
    align-items: center;
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;

    button {
      display: flex;
      justify-content: center;
      align-items: center;

      padding-inline: 0.6rem;

      border: none;
      outline: none;
      background-color: transparent;

      opacity: 0.5;
      cursor: pointer;

      &:hover {
        opacity: 1;
      }
    }

    .profile {
      width: 1.8rem;
      height: 1.8rem;
      border-radius: 50%;
      border: 1px solid ${({ theme }) => theme.colors.black};
      background-color: ${({ theme }) => theme.colors.border};
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
