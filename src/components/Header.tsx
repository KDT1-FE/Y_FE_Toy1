import styled from 'styled-components';
import logo from '../assets/icons/Logo.svg';
import wikiLogo from '../assets/icons/WikiLogo.svg';
import galleryLogo from '../assets/icons/GalleryLogo.svg';
import commuteLogo from '../assets/icons/CommuteLogo.svg';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const StyledHeader = styled.div`
    height: 4rem;
    box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  `;
  const Container = styled.div`
    max-width: 1580px;
    margin: 0 auto;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    @media screen and (max-width: 1440px) {
      max-width: 1240px;
    }
    @media screen and (max-width: 1280px) {
      max-width: 1060px;
    }
  `;
  const LogoContainer = styled.div`
    width: 100px;
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
  const Menu = styled.button`
    font-size: 1.1rem;
    font-weight: 300;
    background-color: #fff;
    border: none;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    cursor: pointer;
    &:hover {
      border-bottom: 1px solid #4a5568;
    }
  `;
  const CommuteMenu = styled(Menu)`
    border: 1px solid #e2e8f0;
    border-radius: 0.9rem;
    padding: 0.5rem;
    &:hover {
      background-color: #edf2f7;
      border-bottom: none;
    }
  `;
  return (
    <StyledHeader>
      <Container>
        <LogoContainer>
          <img src={logo}></img>
          WIKI
        </LogoContainer>
        <MenuContainer>
          <Menu
            onClick={() => {
              navigate('/wiki');
            }}
          >
            Wiki
            <img src={wikiLogo}></img>
          </Menu>
          <Menu
            onClick={() => {
              navigate('/gallery');
            }}
          >
            Wiki Gallery
            <img src={galleryLogo}></img>
          </Menu>
          <CommuteMenu>
            Commute
            <img src={commuteLogo}></img>
          </CommuteMenu>
        </MenuContainer>
      </Container>
    </StyledHeader>
  );
}
export default Header;
