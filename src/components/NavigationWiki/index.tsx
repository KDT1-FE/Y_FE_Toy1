import styled from 'styled-components';
import { Container } from 'components/NavigationContainer';
import { useNavigate, useLocation } from 'react-router-dom';
import { ROUTES } from 'constants/routes';
import { CATEGORY } from 'constants/wiki';
import { media } from 'styles/media';

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
    <StyledWikiContainer>
      <StyledCategoryContainer>
        {CATEGORY.map((category: ICategory, categoryIndex) => (
          <StyledCategoryUl key={categoryIndex}>
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
          </StyledCategoryUl>
        ))}
      </StyledCategoryContainer>
    </StyledWikiContainer>
  );
}

const StyledWikiContainer = styled(Container) `
  ${media.desktop_lg(`
    width: 10rem;
  `)}
  ${media.tablet(`
    width: 8rem;
  `)}
  ${media.tablet_680(`
    width: 7rem;
  `)}
  ${media.tablet_625(`
    width: 6rem;
  `)}
  ${media.mobile_430(`
    width: 5rem;
  `)}  
`;

const StyledCategoryContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledCategoryUl = styled.ul`
  padding: 0;
  color: white;
  margin: 2rem 0 0 0.25rem;

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
  
  ${media.desktop_lg(`
    font-size: 1rem;
  `)}
  ${media.tablet(`
    font-size: 0.9rem;
  `)}
  ${media.tablet_680(`
    font-size: 0.8rem;
  `)}
  ${media.tablet_625(`
    font-size: 0.5rem;
  `)}
  ${media.mobile_430(`
    font-size: 0.4rem;
  `)}
`;

export default NavigationWiki;
