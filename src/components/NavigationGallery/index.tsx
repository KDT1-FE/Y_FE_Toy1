import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'components/NavigationContainer';
import { media } from 'styles/media';

function NavigationGallery() {
  const categories = [
    { id: 1, name: '사진첩1' },
    { id: 2, name: '사진첩2' },
    { id: 3, name: '사진첩3' },
    { id: 4, name: '사진첩4' },
    { id: 5, name: '사진첩5' },
  ];

  return (
    <Container>
      <LogoText>사진첩</LogoText>
      <GalleryCategories>
        {categories.map((category) => {
          const url = `/gallery?category=${category.name}`;
          return (
            <StyledLink key={category.id} to={url}>
              {category.name}
            </StyledLink>
          );
        })}
      </GalleryCategories>
    </Container>
  );
}

const LogoText = styled.span`
  margin: 1.875rem 0 1.875rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  cursor: default;
  ${media.tablet_680(`
  font-size: 1.3rem;
`)}
`;

const GalleryCategories = styled.ul`
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const StyledLink = styled(Link)`
  color: #fff;
  text-decoration: none;
  &:hover {
    border-bottom: 2px solid #e2e8f0;
    cursor: pointer;
  }
`;

export default NavigationGallery;
