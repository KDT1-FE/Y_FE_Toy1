import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { allCategories } from '../data/categories';
import CategoryList from './CategoryList';

const SideBar = () => {
  const location = useLocation();

  const filteredCategory = allCategories.filter((category) =>
    location.pathname.startsWith(category.path),
  )[0].categories;

  return (
    <Container>
      <CategoryWrapper>
        <CategoryList categories={filteredCategory} />
      </CategoryWrapper>
    </Container>
  );
};

const Container = styled.aside`
  display: none;

  @media screen and (min-width: 1024px) {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 330px;
    min-height: ${(props) =>
      `calc(100vh - (${props.theme.size.header} + ${props.theme.size.nav}))`};

    border-right: 1px solid ${(props) => props.theme.colors.border};

    z-index: 10;
  }

  div.logo {
    display: flex;
    align-items: center;

    padding-left: 2rem;
    height: 56px;
    border-bottom: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const CategoryWrapper = styled.nav`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

export default SideBar;
