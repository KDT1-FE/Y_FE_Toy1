import { useState } from 'react';
import styled from 'styled-components';
import { MdOutlineKeyboardArrowDown, MdOutlineKeyboardArrowUp } from 'react-icons/md';
import { CategoryType } from '../data/categories';
import { Link } from 'react-router-dom';

interface Props {
  category: CategoryType;
  openByDefault?: boolean;
}

const Category = ({ category, openByDefault }: Props) => {
  const [isMenuOpen, setMenuOpen] = useState(openByDefault);

  return (
    <CategoryContainer>
      <div className="sub-title" onClick={() => setMenuOpen(!isMenuOpen)}>
        <h3>{category.title}</h3>
        {isMenuOpen ? (
          <MdOutlineKeyboardArrowUp size="20" />
        ) : (
          <MdOutlineKeyboardArrowDown size="20" />
        )}
      </div>
      {isMenuOpen && (
        <div className="sub-category">
          {category.subCategories.map((sub, index) => (
            <Link key={index} to={`${sub.link}`}>
              {sub.text}
            </Link>
          ))}
        </div>
      )}
    </CategoryContainer>
  );
};

const CategoryContainer = styled.li`
  display: flex;
  flex-direction: column;

  padding: 10px 2rem 10px 0;

  .sub-title {
    display: flex;
    align-items: center;
    justify-content: space-between;

    margin-bottom: 0.5rem;

    cursor: pointer;

    h3 {
      font-size: ${(props) => props.theme.fontSize.subTitle};
      font-weight: 600;

      padding: 10px 0;
    }
  }

  .sub-category {
    display: flex;
    flex-direction: column;
    row-gap: 0.4rem;

    font-size: ${(props) => props.theme.fontSize.text};
  }
`;

export default Category;
