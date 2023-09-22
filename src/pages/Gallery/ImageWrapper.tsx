import { useState } from 'react';
import styled from 'styled-components';
import EditModal from './EditModal';
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
  width: 30%;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  margin-bottom: 5%;
  border: 0.1px solid #9d9c9c30;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;
const ProjectName = styled.div`
  position: absolute;
  top: calc(100% + 10px);
  left: 0;
  font-size: 16px;
  font-weight: 600;
`;
