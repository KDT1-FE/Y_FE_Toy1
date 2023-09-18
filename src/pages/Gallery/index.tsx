import NavigationGallery from 'components/NavigationGallery';
import UploadGalleryModal from 'components/UploadGalleryModal';
import ReadGallery from 'components/ReadGallery';
import styled from 'styled-components';

function Gallery() {
  return (
    <>
      <StyledContainer>
        <NavigationGallery></NavigationGallery>
        <StyledGalleryContainer>
          <UploadGalleryModal></UploadGalleryModal>
          <ReadGallery></ReadGallery>
        </StyledGalleryContainer>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

const StyledGalleryContainer = styled.div`
  width: 100%;
  height: 56rem;
  display: flex;
  flex-direction: column;
`;

export default Gallery;
