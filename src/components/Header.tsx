import styled from 'styled-components';
import { AiFillEdit } from 'react-icons/ai';

const Header = () => {
  return (
    <Container>
      <Navbar>
        <h2>APP LOGO</h2>
        <input type="text" />
      </Navbar>
      <Navbar>
        <AiFillEdit size="24" />
      </Navbar>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  padding: 14px 24px;

  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 100%;
`;

export default Header;
