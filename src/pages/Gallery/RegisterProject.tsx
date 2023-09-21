import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { GalleryMainContainer, CategoryTitleSection, BreadCrumb, CategoryTitle } from './Project';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../common/config';
// import { useUser } from '../../common/UserContext';

const RegisterProject = () => {
  const [projectInfo, setProjectInfo] = useState({
    imageUrl: '' as any,
    state: 'ongoing',
    name: '',
    description: '',
    participant: '',
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

  const postNewProject = async () => {
    try {
      if (projectInfo.imageUrl !== '') {
        const imageBlob = await fetch(projectInfo.imageUrl).then((res) => res.blob());
        const storageRef = ref(storage, `projectImage/${new Date().getTime()}`);
        await uploadBytes(storageRef, imageBlob);
        const imageUrl = await getDownloadURL(storageRef);

        await addDoc(collection(db, 'projectData'), {
          state: projectInfo.state,
          imageUrl: imageUrl,
          name: projectInfo.name,
          description: projectInfo.description,
        });
      } else {
        await addDoc(collection(db, 'projectData'), {
          state: projectInfo.state,
          name: projectInfo.name,
          description: projectInfo.description,
        });
      }

      alert('프로젝트 생성 완료');
      window.location.href = `${projectInfo.state}`;
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <GalleryMainContainer>
      <CategoryTitleSection>
        <CategoryTitle>프로젝트 추가</CategoryTitle>
        <BreadCrumb>갤러리 &gt; 프로젝트 &gt; 프로젝트 추가</BreadCrumb>
      </CategoryTitleSection>
      <MainSection>
        <LeftSection>
          <SubTitle>프로젝트 사진</SubTitle>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ImageWrapperDiv
              style={{ backgroundImage: `url(${projectInfo.imageUrl})` }}
            ></ImageWrapperDiv>
            <input
              style={{ width: '300px' }}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
          <SubTitle>프로젝트 상태</SubTitle>
          <SelectState value={projectInfo.state} onChange={handleSelectChange}>
            <option value="ongoing">진행</option>
            <option value="scheduled">예정</option>
            <option value="completed">종료</option>
          </SelectState>
        </LeftSection>
        <RightSection>
          <SubTitle>프로젝트 이름</SubTitle>
          <NameInput
            type="text"
            value={projectInfo.name}
            placeholder="프로젝트 이름을 입력해주세요."
            onChange={(e) => {
              setProjectInfo((prevInfo) => ({
                ...prevInfo,
                name: e.target.value,
              }));
            }}
          />
          <SubTitle>프로젝트 설명</SubTitle>
          <DescriptionDiv
            value={projectInfo.description}
            placeholder="프로젝트 설명을 입력해주세요."
            onChange={(e) => {
              setProjectInfo((prevInfo) => ({
                ...prevInfo,
                description: e.target.value,
              }));
            }}
          ></DescriptionDiv>
        </RightSection>
      </MainSection>
      <ButtonSection>
        <Button onClick={postNewProject} style={{ backgroundColor: '#3267B1' }}>
          확인
        </Button>
      </ButtonSection>
    </GalleryMainContainer>
  );
};

export default RegisterProject;

const ImageWrapperDiv = styled.div`
  position: relative;
  margin: 20px 0;
  width: 300px;
  min-width: 200px;
  max-width: 500px;
  aspect-ratio: 1;
  background-color: lightgray;
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  border: 0.1px solid #9d9c9c30;
`;

const SubTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
`;

const MainSection = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  @media screen and (max-width: 768px) {
    flex-direction: column;
    margin-bottom: 20px;
  }
`;
const LeftSection = styled.div`
  width: 45%;
  min-width: 300px;
`;
const RightSection = styled.div`
  width: 45%;
  min-width: 300px;
`;

const SelectState = styled.select`
  margin: 20px 0 30px;
  width: 100%;
  padding: 5px;
  border: 0.1px solid #9d9c9c30;
  border-radius: 4px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const ButtonSection = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: flex-start;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR';
  width: 45%;
  min-width: 300px;
  cursor: pointer;
  height: 47px;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  color: rgb(252, 252, 252);
  text-align: center;
  line-height: 47px;
`;

const NameInput = styled.input`
  font-family: 'Noto Sans KR';
  margin-top: 20px;
  width: 100%;
  padding: 10px;
  outline: none;
  border-radius: 4px;
  border: 1px solid #9d9c9c30;
  margin-bottom: 20px;
`;

const DescriptionDiv = styled.textarea`
  margin-top: 20px;
  width: 100%;
  height: 325px;
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
