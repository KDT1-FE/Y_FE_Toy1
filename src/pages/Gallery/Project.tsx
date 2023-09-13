import styled from 'styled-components'
import galleryDummyImage from '../../assets/galleryDummyImage.webp';
import ImageWrapper from './ImageWrapper';

const Project = () => {
  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <h1>프로젝트</h1>
        <BreadCrumb>갤러리 &gt; 사진첩 &gt; 프로젝트</BreadCrumb>
      </CategoryTitleSection>
      <ImageSection>
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
        <ImageWrapper imageUrl={galleryDummyImage} />
      </ImageSection>
      {/* <h2>{category}</h2> */}
    </GalleryMainContainer>
  )
}

export default Project

const GalleryMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
`;

const CategoryTitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;
const ImageSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0 5%;
  margin-top: 30px;
`;