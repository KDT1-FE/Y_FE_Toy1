import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <Container>
      <Navbar>
        <input type="text" />
      </Navbar>
      <Navbar>
        <Link to={'wiki'}>
          <AiFillEdit size="24" />
        </Link>
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
  justify-content: center;
  align-items: center;

  height: 100%;
`;

export default Header;
