import React, { ChangeEvent } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { ProjectProps } from './ImageWrapper';

interface ModalProps extends ProjectProps {
  closeOnClick: () => void;
}

const EditModal = ({ state, projectId, imageUrl, closeOnClick }: ModalProps) => {
  const [projectInfo, setProjectInfo] = React.useState<ProjectProps>({
    imageUrl: imageUrl,
    projectId: projectId,
    state: state,
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrl = e.target?.result;
        setProjectInfo((prevInfo) => ({
          ...prevInfo,
          imageUrl: newImageUrl as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = event.target.value;
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      state: selectedValue,
    }));
  };

  const updateProjectInfo = () => {
    // update project info to firebase
    closeOnClick();
  };

  return (
    <EditModalBg onClick={closeOnClick}>
      <EditModalContainer onClick={(e) => e.stopPropagation()}>
        <FlexEndDiv>
          <CloseBtn onClick={closeOnClick} />
        </FlexEndDiv>
        <FlexStartDiv>
          <b>프로젝트 사진</b>
        </FlexStartDiv>
        <FlexCenterDiv>
          <ImageWrapperDiv
            style={{ backgroundImage: `url(${projectInfo.imageUrl})` }}
          ></ImageWrapperDiv>
          <input
            style={{ width: '50%', fontSize: '12px', marginTop: '5px' }}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </FlexCenterDiv>
        <FlexStartDiv>
          <b>프로젝트 상태</b>
        </FlexStartDiv>
        <SelectState value={projectInfo.state} onChange={handleSelectChange}>
          <option value="ongoing">진행</option>
          <option value="scheduled">예정</option>
          <option value="completed">종료</option>
        </SelectState>
        <FlexCenterDiv style={{ flexDirection: 'row', marginTop: '20px', gap: '30px' }}>
          <Button onClick={closeOnClick}>취소</Button>
          <Button
            onClick={updateProjectInfo}
            style={{ backgroundColor: '#1F94FF', color: '#FCFCFC' }}
          >
            확인
          </Button>
        </FlexCenterDiv>
      </EditModalContainer>
    </EditModalBg>
  );
};

export default EditModal;

const EditModalBg = styled.div`
  position: fixed;
  z-index: 20;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const EditModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  padding: 20px 30px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1024px) {
    left: 50%;
    width: 400px;
  }
`;

const FlexStartDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 10px 0;
`;

const FlexEndDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CloseBtn = styled(AiOutlineClose)`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;

const FlexCenterDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const ImageWrapperDiv = styled.div`
  position: relative;
  width: 50%;
  aspect-ratio: 1;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 0.1px solid #9d9c9c30;
`;
const SelectState = styled.select`
  padding: 5px;
  border: 0.1px solid #9d9c9c30;
  border-radius: 4px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR';
  width: 50%;
  cursor: pointer;
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 1);
  color: rgba(10, 10, 10, 0.7);
`;
