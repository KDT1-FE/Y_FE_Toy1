import NavigationGallery from 'components/NavigationGallery';
import GalleryCreate from 'components/GalleryCreate';
import styled from 'styled-components';

function Gallery() {
  return (
    <>
      <StyledContainer>
        <NavigationGallery></NavigationGallery>
        <GalleryCreate></GalleryCreate>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default Gallery;
