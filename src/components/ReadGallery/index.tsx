import { useState, useEffect } from 'react';
import { getGalleryData, GalleryData } from 'apis/Gallery';
import { useLocation } from 'react-router-dom';
import DeleteGallery from 'utils/deleteGalleryData';
import styled from 'styled-components';
import deleteIcon from '../../assets/icons/deleteIcon.png';
import { media } from 'styles/media';
import { Loading } from 'components/Common/Loading';

function ReadGallery() {
  const [galleryRead, setGalleryRead] = useState<GalleryData[]>([]);
  const [isReading, setIsReading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const getGalleryList = async () => {
    setIsReading(true);
    const result = await getGalleryData();
    if (result !== undefined) {
      setGalleryRead(result);
    }
    setIsReading(false);
    setIsDeleting(false);
  };

  useEffect(() => {
    getGalleryList();
  }, [isDeleting]);

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedCategory = searchParams.get('category');

  return (
    <>
      {isReading ? (
        <Loading></Loading>
      ) : (
        <StyledImgContainer>
          {galleryRead.map((item, index) => {
            if (selectedCategory === item.category) {
              return (
                <StyledPhotoContainer key={index} id={item.category}>
                  <StyledReadGallery src={item.src}></StyledReadGallery>
                  <StyledDeleteIcon
                    id={item.id}
                    src={deleteIcon}
                    onClick={() => {
                      DeleteGallery(item.id, setIsDeleting);
                    }}
                  ></StyledDeleteIcon>
                </StyledPhotoContainer>
              );
            }
            return null;
          })}
          {galleryRead.every((item) => selectedCategory !== item.category) && (
            <StyledReadGalleryNone>
              아직 등록된 사진이 없습니다.
            </StyledReadGalleryNone>
          )}
        </StyledImgContainer>
      )}
    </>
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
  &::-webkit-scrollbar {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.4);
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.3);
    border-radius: 6px;
  }
  ${media.desktop_lg(`
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr 1fr;
`)}
  ${media.tablet_680(`
    height: 35rem;
  `)}
  ${media.tablet_625(`
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr ;
    margin-left: 0;  
    place-items: center;
`)}
  ${media.mobile_430(`
    height: 25rem;
  `)}
`;

const StyledPhotoContainer = styled.div`
  width: 20rem;
  height: 11.5rem;
  position: relative;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-10px);
  }
  ${media.desktop_2xl(`
    width: 20rem;
    height: 10rem;
  `)}
  ${media.desktop_xl(`
    width: 18rem;
    height: 9rem;
`)}
  ${media.desktop_xl(`
    width: 16rem;
    height: 8rem;
`)}
  ${media.tablet(`
    width: 15rem;
    height: 7.5rem;
  `)}
  ${media.tablet_680(`
    width: 13rem;
    height: 6.5rem;
`)}

  ${media.tablet_625(`
    width: 15rem;
    height: 7.5rem;
  `)}
  ${media.mobile_430(`
    width: 10rem;
    height: 5rem;
`)}
`;

const StyledReadGallery = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 5px;
  cursor: default;
  object-fit: contain;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.25);
`;

const StyledDeleteIcon = styled.img`
  width: 1.5rem;
  position: absolute;
  top: 0.625rem;
  left: 87%;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: scale(1.1);
  }

  ${media.tablet(`
    width: 1.3rem;
  `)}

  ${media.tablet_680(`
    width: 1rem;
`)}
`;

const StyledReadGalleryNone = styled.div`
  width: 35.345rem;
  height: 3.625rem;
  font-size: 3rem;
  font-weight: 600;
  text-align: center;
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  ${media.desktop_lg(`
    font-size: 2rem;
`)}
  ${media.tablet_625(`
  width: 25rem;
  height: 10rem;
  font-size: 1.5rem;
  top: 40%;
`)}
${media.mobile(`
  font-size: 1.2rem;
  top: 50%;
`)}
`;
