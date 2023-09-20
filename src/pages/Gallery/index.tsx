import NavigationGallery from 'components/NavigationGallery';
import UploadGalleryModal from 'components/UploadGalleryModal';
import ReadGallery from 'components/ReadGallery';
import styled from 'styled-components';
import Loading from 'components/Common/Loading';
import { useState } from 'react';

function Gallery() {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <>
      <StyledContainer>
        <NavigationGallery></NavigationGallery>
        <StyledGalleryContainer>
          {isLoading ? (
            <>
              이미지 등록 중<Loading></Loading>
            </>
          ) : (
            <>
              <UploadGalleryModal
                setIsLoading={setIsLoading}
              ></UploadGalleryModal>
              <ReadGallery></ReadGallery>
            </>
          )}
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
