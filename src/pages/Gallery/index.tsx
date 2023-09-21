import NavigationGallery from 'components/NavigationGallery';
import UploadGalleryModal from 'components/UploadGalleryModal';
import ReadGallery from 'components/ReadGallery';
import styled from 'styled-components';
import { media } from 'styles/media';
import Loading from 'components/Common/LoadingImgRegister';
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
              <StyledLoadingContainer>
                <Loading></Loading>
                <StyledLoadingText>이미지 등록 중</StyledLoadingText>
              </StyledLoadingContainer>
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

const StyledLoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  ${media.desktop_lg(`
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`)}
  ${media.tablet_680(`
  height: 35rem;
`)}
${media.mobile_430(`
  height: 25rem;
`)}
`;

const StyledLoadingText = styled.div`
  position: absolute;
  bottom: 45%;
  ${media.tablet_680(`
    bottom: 43%;
`)}
  ${media.mobile_430(`
    bottom: 40%;
`)}
`;

export default Gallery;
