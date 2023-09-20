import { useState } from 'react';
import styled from 'styled-components';
import EditModal from './EditModal';
import { ProjectStateProps } from './Project';


const ImageWrapper = ({ imageUrl, projectId, state }: ProjectStateProps) => {
  const [showEditStateBtn, setShowEditStateBtn] = useState<boolean>(false);
  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const showEditModalHandler = () => {
    setShowEditModal(true);
    document.body.style.overflow = 'hidden';
  };
  const closeEditModalHandler = () => {
    setShowEditModal(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ImageWrapperDiv
        onMouseEnter={() => setShowEditStateBtn(true)}
        onMouseLeave={() => setShowEditStateBtn(false)}
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundColor: imageUrl ? 'none' : 'lightgray',
        }}
      >
        {!imageUrl && <div>이미지가 없습니다</div>}
        {showEditStateBtn && (
          <EditStateBtn onClick={() => showEditModalHandler()}>수정</EditStateBtn>
        )}
      </ImageWrapperDiv>
      {showEditModal && (
        <EditModal
          imageUrl={imageUrl}
          projectId={projectId}
          state={state}
          closeOnClick={() => closeEditModalHandler()}
        ></EditModal>
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
`;

const EditStateBtn = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  padding: 5px 10px;
  background-color: #e2e2e2;
  color: #797979;
  border-radius: 4px;
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 14px;

  @media screen and (max-width: 1200px) {
    padding: 3px 6px;
    font-size: 12px;
  }
`;
