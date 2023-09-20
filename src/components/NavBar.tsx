import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';

const NavBar = () => {
  const selectedCategory = useLocation().pathname.split('/')[1];

  return (
    <Container>
      <Categories>
        <div className={`category ${selectedCategory === 'wiki' ? 'selected' : ''}`}>
          <Link to={'wiki'}>Wiki</Link>
        </div>
        <div className={`category ${selectedCategory === 'gallery' ? 'selected' : ''}`}>
          <Link to={'gallery'}>Gallery</Link>
        </div>
        <div className={`category ${selectedCategory === '' ? 'selected' : ''}`}>
          <Link to={'/contact'}>Contact</Link>
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
