import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { allCategories } from '../data/categories';
import { Fragment } from 'react';

const SideBar = () => {
  const location = useLocation();

  // <CategoryList>
  //   <Category>
  //     <h3 className="sub-title">sub title</h3>
  //     <Link to={'/'} className="sub-category">
  //       1
  //     </Link>
  //     <Link to={'/'} className="sub-category">
  //       2
  //     </Link>
  //     <Link to={'/'} className="sub-category">
  //       3
  //     </Link>
  //   </Category>
  // </CategoryList>;

  return (
    <Container>
      <div className="logo">
        <Link to={'/'}>Home (App Logo)</Link>
      </div>
      <CategoryWrapper>
        {allCategories
          .filter((category) => category.path === location.pathname)
          .map((filteredCategory, index) => (
            <CategoryList key={index}>
              {filteredCategory.categories.map((category, index) => (
                <Category>
                  <Fragment key={index}>
                    <h3 className="sub-title">{category.title}</h3>
                    {category.subCategories.map((sub, index) => (
                      <Link key={index} to={sub.link}>
                        {sub.text}
                      </Link>
                    ))}
                  </Fragment>
                </Category>
              ))}
            </CategoryList>
          ))}
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

const CategoryList = styled.ul`
  display: flex;
  flex-direction: column;

  width: 100%;

  max-height: calc(100vh - 56px);
  overflow-y: auto;
`;

const Category = styled.li`
  display: flex;
  flex-direction: column;

  padding: 10px 0;
  padding-left: 2rem;

  .sub-title {
    font-size: ${(props) => props.theme.fontSize.subTitle};
    font-weight: 600;

    padding: 10px 0;
  }

  .sub-category {
  }
`;

export default SideBar;
