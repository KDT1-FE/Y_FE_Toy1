import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { allCategories } from '../data/categories';
import CategoryList from './CategoryList';
import { useContext } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { MenuContext } from '../common/useMenu';

const SideBar = () => {
  const location = useLocation();
  const { isMenuOpen, setMenuOpen } = useContext(MenuContext);

  const filteredCategory = allCategories.filter((category) =>
    location.pathname.startsWith(category.path),
  )[0].categories;

  return (
    <Container className={`${isMenuOpen ? 'open' : ''}`}>
      <button onClick={() => setMenuOpen(false)}>
        <AiOutlineClose size={21} />
      </button>

      <CategoryWrapper>
        <CategoryList categories={filteredCategory} />
      </CategoryWrapper>
    </Container>
  );
};

const Container = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 330px;
  min-height: ${(props) =>
    `calc(100vh - (${props.theme.size.header} + ${props.theme.size.nav} + ${props.theme.size.footer}))`};

  border-right: 1px solid ${(props) => props.theme.colors.border};
  background-color: #fff;

  z-index: 10;

  button {
    display: none;
  }

  @media screen and (max-width: 1024px) {
    display: flex;
    position: fixed;
    top: 0;
    right: 0;
    transform: translateX(100%);
    min-width: 250px;
    height: 100vh;

    padding: 2rem;
    z-index: 100;

    transition: transform 0.2s ease;

    &.open {
      transform: translateX(0);
    }

    button {
      display: flex;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 1rem;
      right: 1rem;
      cursor: pointer;

      background-color: transparent;
      outline: none;
      border: none;
    }
  }

  div.logo {
    display: flex;
    align-items: center;

    padding-left: 2rem;
    height: 56px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }

  &.mobile {
  }
`;

const CategoryWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default SideBar;
