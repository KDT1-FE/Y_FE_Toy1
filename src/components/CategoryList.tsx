import styled from 'styled-components';
import Category from './Category';
import { CategoryType } from '../data/categories';

interface Props {
  categories: CategoryType[];
}

const CategoryList = ({ categories }: Props) => {
  return (
    <CategoryListContainer>
      {categories.map((category, index) => (
        <Category category={category} openByDefault={index === 0} key={index} />
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

export default CategoryList;
