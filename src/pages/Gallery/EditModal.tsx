import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { AiOutlineClose } from 'react-icons/ai';
import { ProjectProps } from './Project';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../../common/config';

interface ModalProps extends ProjectProps {
  closeOnClick: () => void;
}

const EditModal = ({
  state,
  projectId,
  imageUrl,
  name,
  description,
  participants,
  closeOnClick,
}: ModalProps) => {
  const [projectInfo, setProjectInfo] = useState<ProjectProps>({
    imageUrl: imageUrl,
    projectId: projectId,
    state: state,
    name: name,
    description: description,
    participants: participants,
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newImageUrl = e.target?.result;
        setProjectInfo((prevInfo) => ({
          ...prevInfo,
          imageUrl: newImageUrl,
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

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      name: e.target.value,
    }));
  };
  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setProjectInfo((prevInfo) => ({
      ...prevInfo,
      description: e.target.value,
    }));
  };

  const editProject = async () => {
    try {
      const docRef = doc(db, 'projectData', projectInfo.projectId);

      if (projectInfo.imageUrl && projectInfo.imageUrl.startsWith('data:')) {
        const projectDocSnap = await getDoc(docRef);
        const prevImageUrl = projectDocSnap.data()?.imageUrl;

        if (prevImageUrl) {
          const prevImageRef = ref(storage, prevImageUrl);
          await deleteObject(prevImageRef);
        }
        const imageBlob = await fetch(projectInfo.imageUrl).then((res) => res.blob());
        const storageRef = ref(storage, `projectImage/${new Date().getTime()}`);

        await uploadBytes(storageRef, imageBlob);
        const imageUrl = await getDownloadURL(storageRef);

        await setDoc(docRef, {
          state: projectInfo.state,
          imageUrl: imageUrl,
          name: projectInfo.name ? projectInfo.name : '',
          description: projectInfo.description ? projectInfo.description : '',
        });
      } else {
        await setDoc(docRef, {
          state: projectInfo.state,
          imageUrl: projectInfo.imageUrl ? projectInfo.imageUrl : '',
          name: projectInfo.name ? projectInfo.name : '',
          description: projectInfo.description ? projectInfo.description : '',
        });
      }

      alert('프로젝트 수정 완료');
      window.location.href = `${projectInfo.state}`;
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <EditModalBg onClick={closeOnClick}>
      <EditModalContainer onClick={(e) => e.stopPropagation()}>
        <FlexDiv>
          <div style={{ flex: '1', display: 'flex', justifyContent: 'flex-end' }}>
            <CloseBtn onClick={closeOnClick} />
          </div>
        </FlexDiv>
        <MainDiv>
          <MainLeftDiv>
            <TitleDiv>
              <b>사진</b>
            </TitleDiv>
            <FlexCenterDiv>
              <ImageWrapperDiv
                style={{ backgroundImage: `url(${projectInfo.imageUrl})` }}
              ></ImageWrapperDiv>
              <input
                style={{ width: '100%', fontSize: '12px', marginTop: '5px' }}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
            </FlexCenterDiv>
            <TitleDiv style={{ marginTop: '20px' }}>
              <b>상태</b>
            </TitleDiv>
            <SelectState value={projectInfo.state} onChange={handleSelectChange}>
              <option value="ongoing">진행</option>
              <option value="scheduled">예정</option>
              <option value="completed">종료</option>
            </SelectState>
          </MainLeftDiv>
          <MainRightDiv>
            <TitleDiv>이름</TitleDiv>
            <NameInput
              onChange={handleNameChange}
              placeholder="프로젝트 이름을 입력해주세요."
              value={projectInfo.name}
            />
            <TitleDiv>설명</TitleDiv>
            <DescriptionDiv
              onChange={handleDescriptionChange}
              value={projectInfo.description}
              placeholder="프로젝트 설명을 입력해주세요."
            />
          </MainRightDiv>
        </MainDiv>
        <ButtonSection>
          <Button onClick={closeOnClick} style={{ color: '#797979' }}>
            취소
          </Button>
          <Button onClick={editProject} style={{ backgroundColor: '#3267B1' }}>
            확인
          </Button>
        </ButtonSection>
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
  width: 700px;
  height: 582px;
  padding: 40px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 400px;
    height: 70vh;
    overflow: scroll;
    padding: 20px;
  }
`;
const MainDiv = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 40px;

  @media (max-width: 768px) {
    flex-direction: column;
    gap:20px;
  }
`;
const MainLeftDiv = styled.div``;
const MainRightDiv = styled.div`
  width: 100%;
`;

const TitleDiv = styled.div`
  margin-bottom: 10px;
  font-size: 21px;
  font-weight: 700;
`;

const NameInput = styled.input`
  font-family: 'Noto Sans KR';
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #9d9c9c30;
  margin-bottom: 20px;
`;

const DescriptionDiv = styled.textarea`
  width: 100%;
  height: 268px;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #9d9c9c30;
  resize: none;
  outline: none;
  font-family: 'Noto Sans KR';
  @media (max-width: 768px) {
    height: 150px;
  }
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: space-between;
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
  width: 240px;
  height: 240px;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 0.1px solid #9d9c9c30;
  @media (max-width: 768px) {
    width: 150px;
    height: 150px;
  }
`;
const SelectState = styled.select`
  padding: 5px;
  width: 100%;
  border: 0.1px solid #9d9c9c30;
  border-radius: 4px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const ButtonSection = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 12px;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR';
  width: 240px;
  cursor: pointer;
  height: 47px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgb(252, 252, 252);
  text-align: center;
  line-height: 47px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;
