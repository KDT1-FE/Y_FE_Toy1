import NavigationGallery from 'components/NavigationGallery';
import UploadGallery from 'components/UploadGallery';
import styled from 'styled-components';

function Gallery() {
  return (
    <>
      <StyledContainer>
        <NavigationGallery></NavigationGallery>
        <UploadGallery></UploadGallery>
      </StyledContainer>
    </>
  );
}

const StyledContainer = styled.div`
  display: flex;
`;

export default Gallery;
