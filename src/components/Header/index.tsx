import styled from 'styled-components';
import logo from '../../assets/icons/mainLogo.svg';
import wikiLogo from '../../assets/icons/wiki.svg';
import galleryLogo from '../../assets/icons/gallery.svg';
import menu from '../../assets/icons/menu.svg';
import { ROUTES } from 'constants/routes';
import { Link, useNavigate } from 'react-router-dom';
import CommuteModal from 'components/CommuteModal';
import { media } from 'styles/media';
import { useState } from 'react';

function Header() {
  const [menuToggle, setMenuToggle] = useState(false);
  const navigate = useNavigate();

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
            Gallery
            <img src={galleryLogo}></img>
          </Menu>
        </MenuContainer>
        <div
          onClick={() => {
            setMenuToggle(false);
          }}
        >
          <CommuteModal />
        </div>
        <StyledHamburgerButton
          onClick={() => {
            setMenuToggle(!menuToggle);
          }}
        >
          <img src={menu}></img>
        </StyledHamburgerButton>
        {menuToggle && (
          <StyledSideBar>
            <StyledSideText
              onClick={() => {
                setMenuToggle(false);
                navigate(ROUTES.WIKI);
              }}
            >
              Wiki
            </StyledSideText>
            <StyledSideText
              onClick={() => {
                setMenuToggle(false);
                navigate(ROUTES.GALLERY);
              }}
            >
              Gallery
            </StyledSideText>
          </StyledSideBar>
        )}
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
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 10000;
`;
const Container = styled.div`
  max-width: 98.75rem;
  margin: 0 auto;
  height: 4rem;

  display: flex;
  align-items: center;

  ${media.desktop_2xl(`
    max-width: 80rem;
  `)}
  ${media.desktop_xl(`
    max-width: 69rem;
  `)}
  ${media.desktop_lg(`
    max-width: 55rem;
  `)}
`;
const LogoContainer = styled.div`
  width: 6.25rem;

  display: flex;
  align-items: center;

  font-weight: 700;
  font-size: 1.5rem;
  color: #3584f4;
  flex-grow: 6;
`;
const MenuContainer = styled.div`
  display: flex;
  gap: 1rem;
  flex: 1;
  ${media.tablet(`
  display:none;
`)} ${media.mobile(`
display:none;
`)};
`;

const StyledHamburgerButton = styled.button`
  display: none;
  ${media.tablet(`
    display:block;
    width:1.9rem;
    height:1.9rem;
`)}
  ${media.mobile(`
    display:block;
    width:1.9rem;
    height:1.9rem;
`)}
`;

const StyledSideBar = styled.div`
  position: absolute;
  background-color: white;
  top: 4rem;
  height: 100vh;
  width: 100vw;
  z-index: 10000;
  display: flex;
  flex-direction: column;
  padding: 3rem;
  gap: 2rem;
`;
const StyledSideText = styled.div`
  font-size: 1.2rem;
  font-weight: 400;

  &:hover {
    border-bottom: 1px solid #4a5568;
    cursor: pointer;
  }
`;
export default Header;
