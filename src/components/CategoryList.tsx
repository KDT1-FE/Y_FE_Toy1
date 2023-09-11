import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Category } from '../data/categories';

interface Props {
  categories: Category[];
}

const CategoryList = ({ categories }: Props) => {
  return (
    <CategoryListContainer>
      {categories.map((category, index) => (
        <Category key={index}>
          <h3 className="sub-title">{category.title}</h3>
          {category.subCategories.map((sub, index) => (
            <Link key={index} to={sub.link}>
              {sub.text}
            </Link>
          ))}
        </Category>
      ))}
    </CategoryListContainer>
  );
};

const CategoryListContainer = styled.ul`
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

export default CategoryList;
