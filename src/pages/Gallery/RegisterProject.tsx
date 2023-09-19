import { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import { GalleryMainContainer, CategoryTitleSection, BreadCrumb } from './Project';
import { collection, addDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../common/config';

const RegisterProject = () => {
  const [projectInfo, setProjectInfo] = useState({
    imageUrl: '' as any,
    state: 'ongoing',
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
        });
      } else {
        await addDoc(collection(db, 'projectData'), {
          state: projectInfo.state,
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
        <h1>프로젝트 추가</h1>
        <BreadCrumb>갤러리 &gt; 프로젝트 &gt; 프로젝트 추가</BreadCrumb>
      </CategoryTitleSection>
      <SubTitle>프로젝트 사진</SubTitle>
      <ImageWrapperDiv
        style={{ backgroundImage: `url(${projectInfo.imageUrl})` }}
      ></ImageWrapperDiv>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <SubTitle>프로젝트 상태</SubTitle>
      <SelectState value={projectInfo.state} onChange={handleSelectChange}>
        <option value="ongoing">진행</option>
        <option value="scheduled">예정</option>
        <option value="completed">종료</option>
      </SelectState>
      <Button onClick={postNewProject} style={{ backgroundColor: '#1F94FF', color: '#FCFCFC' }}>
        확인
      </Button>
    </GalleryMainContainer>
  );
};

export default RegisterProject;

const ImageWrapperDiv = styled.div`
  position: relative;
  margin: 20px 0;
  width: 50%;
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

const SelectState = styled.select`
  margin: 20px 0 30px;
  width: 50%;
  min-width: 200px;
  max-width: 500px;
  padding: 5px;
  border: 0.1px solid #9d9c9c30;
  border-radius: 4px;
  height: 40px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  display: block;
  font-family: 'Noto Sans KR';
  width: 50%;
  min-width: 200px;
  max-width: 500px;
  cursor: pointer;
  height: 40px;
  padding: 5px;
  border: none;
  border-radius: 4px;
  background-color: rgba(250, 250, 250, 1);
  color: rgba(10, 10, 10, 0.7);
`;
