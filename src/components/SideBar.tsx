import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { allCategories } from '../data/categories';
import CategoryList from './CategoryList';

const SideBar = () => {
  const location = useLocation();

  const filteredCategory = allCategories.filter(
    (category) => category.path === location.pathname,
  )[0].categories;

  return (
    <Container>
      <div className="logo">
        <Link to={'/'}>Home (App Logo)</Link>
      </div>
      <CategoryWrapper>
        <CategoryList categories={filteredCategory} />
      </CategoryWrapper>
    </Container>
  );
};

const Container = styled.aside`
  display: none;

  @media screen and (min-width: 1024px) {
    position: fixed;
    display: flex;
    flex-direction: column;
    min-width: 330px;
    min-height: 100vh;

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
