// import { ReactElement } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Container } from 'components/NavigationContainer';

function NavigationGallery() {
  return (
    <Container>
      <LogoText>사진첩</LogoText>
      <GalleryCategories>
        <StyledLink to="/gallery?galleryCategory=사진첩1">사진첩 1</StyledLink>
        <StyledLink to="/gallery?galleryCategory=사진첩2">사진첩 2</StyledLink>
        <StyledLink to="/gallery?galleryCategory=사진첩3">사진첩 3</StyledLink>
        <StyledLink to="/gallery?galleryCategory=사진첩4">사진첩 4</StyledLink>
        <StyledLink to="/gallery?galleryCategory=사진첩5">사진첩 5</StyledLink>
      </GalleryCategories>
    </Container>
  );
}

const LogoText = styled.span`
  margin: 15px 0 30px 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: #fff;
  cursor: default;
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
