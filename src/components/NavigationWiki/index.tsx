import styled from 'styled-components';
import { Container } from 'components/NavigationContainer';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { CATEGORY } from 'constants/wiki';

interface INavigationWikiProps {
  setIsChanged: React.Dispatch<React.SetStateAction<boolean>>;
  isChange: boolean;
}

interface ICategoryInfo {
  text: string;
  pathName: string;
}
interface ICategory {
  name: string;
  info: ICategoryInfo[];
}

function NavigationWiki({ setIsChanged, isChange }: INavigationWikiProps) {
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(useLocation().search);
  const selectedCategory = searchParams.get('category');

  return (
    <Container>
      <CategoryContainer>
        {CATEGORY.map((category: ICategory, categoryIndex) => (
          <CategoryUl key={categoryIndex}>
            <h1>회사생활</h1>
            {category.info.map((info, infoIndex) => (
              <span
                key={infoIndex}
                className={
                  info.pathName === selectedCategory ? 'selected_category' : ''
                }
                onClick={() => {
                  navigate(`${ROUTES.WIKI}?category=${info.pathName}`);
                  setIsChanged(!isChange);
                }}
              >
                {info.text}
              <br/><br/></span>
            ))}
          </CategoryUl>
        ))}
      </CategoryContainer>
    </Container>
  );
}

const CategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const CategoryUl = styled.ul`
  padding: 0;
  color: white;
  margin-top: 2rem;

  h1 {
    margin-bottom: 1rem;
  }

  span {
    margin: 1rem;
    cursor: default;
  }

  span:hover {
    cursor: pointer;
  }
  .selected_category {
    font-weight: 700;
    border-bottom: 2px solid #e2e8f0;
  }
`;

export default NavigationWiki;
