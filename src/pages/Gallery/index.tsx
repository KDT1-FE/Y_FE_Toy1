import NavigationGallery from 'components/NavigationGallery';
import GalleryRead from 'components/GalleryRead';
import styled from 'styled-components';

function Gallery() {
  return (
    <>
      <StyledContainer>
        <NavigationGallery></NavigationGallery>
        <GalleryRead></GalleryRead>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export default Gallery;
