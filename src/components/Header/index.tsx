import styled from 'styled-components';
import logo from '../../assets/icons/logo.svg';
import wikiLogo from '../../assets/icons/wikiLogo.svg';
import galleryLogo from '../../assets/icons/galleryLogo.svg';
import { ROUTES } from 'constants/routes';
import Modal from 'components/Modal';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <StyledHeader>
      <Container>
        <LogoContainer>
          <img src={logo}></img>
          WIKI
        </LogoContainer>
        <MenuContainer>
          <Menu to={ROUTES.WIKI}>
            Wiki
            <img src={wikiLogo}></img>
          </Menu>
          <Menu to={ROUTES.GALLERY}>
            Wiki Gallery
            <img src={galleryLogo}></img>
          </Menu>
          <Modal></Modal>
        </MenuContainer>
      </Container>
    </StyledHeader>
  );
}

const Menu = styled(Link)`
  font-size: 1.1rem;
  font-weight: 300;

  background-color: #fff;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  cursor: pointer;
  &:hover {
    border-bottom: 1px solid #4a5568;
  }
`;

const StyledHeader = styled.div`
  height: 4rem;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
`;
const Container = styled.div`
  max-width: 98.75rem;
  margin: 0 auto;
  height: 4rem;

  display: flex;
  align-items: center;
  justify-content: space-between;

  @media screen and (max-width: 1440px) {
    max-width: 77.5rem;
  }
  @media screen and (max-width: 1280px) {
    max-width: 66.25rem;
  }
`;
const LogoContainer = styled.div`
  width: 6.25rem;

  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1.5rem;
  color: #3584f4;
`;
const MenuContainer = styled.div`
  display: flex;
  gap: 1rem;
`;
export default Header;
