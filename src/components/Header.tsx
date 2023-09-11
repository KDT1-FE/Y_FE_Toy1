import styled from 'styled-components';
import { LuPenSquare, LuUserCircle2 } from 'react-icons/lu';
import { CiSearch } from 'react-icons/ci';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <Navbar>
        <InputWrapper>
          <div className="icon-wrapper">
            <CiSearch size="20" />
          </div>
          <input type="text" />
        </InputWrapper>
        <div className="wrapper">
          <Link to={'wiki'}>
            <div className="icon-wrapper">
              <LuPenSquare size="24" />
            </div>
          </Link>
          <Link to={'wiki'}>
            <div className="icon-wrapper">
              <LuUserCircle2 size="24" />
            </div>
          </Link>
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

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;

    opacity: 0.5;
    margin-left: 0.5rem;
    margin-right: 0.5rem;

    &:hover {
      opacity: 1;
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
