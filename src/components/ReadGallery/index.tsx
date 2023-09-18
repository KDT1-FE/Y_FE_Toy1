import { useState, useEffect } from 'react';
import { getStorage, GalleryData } from 'apis/Gallery';
import { useLocation } from 'react-router-dom';
// import DeleteGallery from 'components/DeleteGallery';
import styled from 'styled-components';
import deleteIcon from '../../assets/icons/deleteIcon.png';

function ReadGallery() {
  const [galleryRead, setGalleryRead] = useState<GalleryData[]>([]);

  const getGalleryList = async () => {
    const result = await getStorage();
    if (result !== undefined) {
      setGalleryRead(result);
    }
  };

  useEffect(() => {
    getGalleryList();
  }, []);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  return (
    <StyledImgContainer>
      {galleryRead.length > 0 ? (
        galleryRead.map((item, index) => {
          if (item.category === selectedCategory || selectedCategory === null) {
            return (
              <StyledPhotoContainer key={index} id={item.category}>
                <StyledReadGallery src={item.src}></StyledReadGallery>
                <StyledDeleteIcon
                  id={item.id}
                  src={deleteIcon}
                  onClick={() => {
                    // DeleteGallery(item.id);
                  }}
                ></StyledDeleteIcon>
              </StyledPhotoContainer>
            );
          }
        })
      ) : (
        <StyledReadGalleryNone>
          아직 등록된 사진이 없습니다.
        </StyledReadGalleryNone>
      )}
    </StyledImgContainer>
  );
}
export default ReadGallery;

const StyledImgContainer = styled.div`
  height: 48.5rem;
  margin-left: 1.875rem;
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1.875rem;
  position: relative;
  overflow-y: auto;
`;

const StyledPhotoContainer = styled.div`
  width: 24.625rem;
  height: 12.9375rem;
  position: relative;
  transition: all 0.2s ease-in-out;
  &: hover {
    transform: translateY(-10px);
  }
`;

const StyledReadGallery = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: default;
  over-fit: contain;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
`;

const StyledDeleteIcon = styled.img`
  position: absolute;
  top: 0.625rem;
  left: 87%;
  transition: all 0.3s ease-in-out;
  &: hover {
    transform: scale(1.1);
  }
`;

const StyledReadGalleryNone = styled.div`
  width: 35.345rem;
  height: 3.625rem;
  font-size: 3rem;
  font-weight: 600;
  margin: 0 auto;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
