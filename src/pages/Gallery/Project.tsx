import styled from 'styled-components';
import galleryDummyImage from '../../assets/galleryDummyImage.webp';
import ImageWrapper from './ImageWrapper';

export interface ProjectStateProps {
  state: string;
}

const Project = ({ state }: ProjectStateProps) => {
  let projectState: string =
    state === 'ongoing'
      ? '진행중인'
      : state === 'scheduled'
      ? '예정된'
      : state === 'completed'
      ? '종료된'
      : '';

  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <h1>{projectState} 프로젝트</h1>
        <BreadCrumb>갤러리 &gt; 프로젝트 &gt; {projectState} 프로젝트</BreadCrumb>
      </CategoryTitleSection>
      <ImageSection>
        <ImageWrapper imageUrl={galleryDummyImage} projectId={1} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={2} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={3} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={4} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={5} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={6} state={state} />
        <ImageWrapper imageUrl={galleryDummyImage} projectId={7} state={state} />
      </ImageSection>
    </GalleryMainContainer>
  );
};

export default Project;

export const GalleryMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
`;

export const CategoryTitleSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BreadCrumb = styled.span`
  font-size: 12px;
  text-align: right;
  color: gray;
`;
export const ImageSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0 5%;
  margin-top: 30px;
`;
