import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { MenuContext } from '../common/useMenu';
import { FcMenu } from 'react-icons/fc';

const NavBar = () => {
  const { setMenuOpen } = useContext(MenuContext);
  const selectedCategory = useLocation().pathname.split('/')[1];

  return (
    <Container>
      <Categories>
        <button className="menu-btn" onClick={() => setMenuOpen(true)}>
          <FcMenu size={21} />
        </button>
        <div className={`category ${selectedCategory === 'wiki' ? 'selected' : ''}`}>
          <Link to={'wiki'}>Wiki</Link>
        </div>
        <div className={`category ${selectedCategory === 'gallery' ? 'selected' : ''}`}>
          <Link to={'gallery'}>Gallery</Link>
        </div>
        <div className={`category ${selectedCategory === 'about' ? 'selected' : ''}`}>
          <Link to={'/about'}>About</Link>
        </div>
      </Categories>
    </Container>
  );
};

const Container = styled.nav`
  position: sticky;
  display: flex;
  justify-content: flex-start;
  top: 0;

  width: 100%;
  height: 56px;

  z-index: 15;

  background-color: ${(props) => props.theme.colors.white};
`;

const Categories = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  height: 100%;
  width: 100%;

  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  button.menu-btn {
    display: flex;
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);

    background-color: transparent;
    outline: none;
    border: none;
    padding: 8px;
    cursor: pointer;

    @media screen and (min-width: 1024px) {
      display: none;
    }
  }

  div.category {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    height: 100%;

    margin-right: 24px;

    cursor: pointer;

    &.selected {
      &::before {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        height: 1px;
        background-color: ${({ theme }) => theme.colors.black};
      }
    }

    &:hover::before {
      position: absolute;
      content: '';
      bottom: 0;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: ${({ theme }) => theme.colors.black};
    }

    a {
      position: relative;
      display: flex;
      justify-content: center;
      align-items: center;

      height: 100%;

      font-size: ${({ theme }) => theme.fontSize.text};
    }
  }
`;

export default NavBar;
