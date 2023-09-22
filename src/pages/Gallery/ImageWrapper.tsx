import { useState } from 'react';
import styled from 'styled-components';
import { ProjectProps } from './Project';
import ProjectDetailModal from './ProjectDetailModal';

const ImageWrapper = ({
  imageUrl,
  projectId,
  state,
  name,
  description,
  participants,
}: ProjectProps) => {
  const [showDetailModal, setShowDetailModal] = useState<boolean>(false);

  const showDetailModalHandler = () => {
    setShowDetailModal(true);
    document.body.style.overflow = 'hidden';
  };
  const closeDetailModalHandler = () => {
    setShowDetailModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ImageWrapperDiv
        onClick={showDetailModalHandler}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageUrl ? 'none' : 'lightgray',
        }}
      >
        <ProjectName style={{}}>{name}</ProjectName>
        {!imageUrl && <div>이미지가 없습니다</div>}
      </ImageWrapperDiv>
      {showDetailModal && (
        <ProjectDetailModal
          imageUrl={imageUrl}
          projectId={projectId}
          state={state}
          name={name}
          description={description}
          participants={participants}
          closeOnClick={closeDetailModalHandler}
        ></ProjectDetailModal>
      )}
    </>
  );
};

export default ImageWrapper;

const ImageWrapperDiv = styled.div`
  position: relative;
  width: calc(33.33% - 20px);
  margin-bottom: 50px;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 1px solid ${(props) => props.theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  @media screen and (max-width: 700px) {
    width: calc(50% - 10px);
    margin-bottom: 50px;
  }
`;
const ProjectName = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  font-size: 16px;
  font-weight: 600;
`;
