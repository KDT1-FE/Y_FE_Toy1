import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ImageWrapper from './ImageWrapper';
import { db } from '../../common/config';
import { collection, getDocs, query, where } from 'firebase/firestore';
import LoadingSpinner from './LoadingSpinner';
import { CategoryTitleSection, CategoryTitle, BreadCrumb } from '../../utils/CategoryTitleSection';

interface ProjectStateProps {
  state: string;
}

export interface ProjectProps extends ProjectStateProps {
  projectId: any;
  imageUrl: any;
  name: any;
  description: any;
  participants: any;
}

const Project = ({ state }: ProjectStateProps) => {
  const [projectData, setProjectData] = useState<Array<ProjectProps>>();
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const SIZE = 6;

  const getPaginatedData = () => {
    const startIndex = (currentPage - 1) * SIZE;
    const endIndex = startIndex + SIZE;
    return projectData?.slice(startIndex, endIndex);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (projectData?.length) {
      if (currentPage < maxPage) {
        setCurrentPage(currentPage + 1);
      }
    }
  };

  const prevButtonStyle = {
    backgroundColor: currentPage === 1 ? 'rgb(252,252,252)' : '#3267B1',
    color: currentPage === 1 ? '#797979' : '',
    cursor: currentPage === 1 ? 'unset' : 'pointer',
  };

  const nextButtonDisable = currentPage === maxPage || maxPage === 1;

  const nextButtonStyle = {
    backgroundColor: nextButtonDisable ? 'rgb(252,252,252)' : '#3267B1',
    color: nextButtonDisable ? '#797979' : '',
    cursor: nextButtonDisable ? 'unset' : 'pointer',
  };

  const fetchProjectData = async () => {
    try {
      const filterStateQuery = query(collection(db, 'projectData'), where('state', '==', state));
      const querySnapshot = await getDocs(filterStateQuery);
      const filteredData: Array<ProjectProps> = [];

      querySnapshot.forEach((doc) => {
        const projectId = doc.id;
        const data = doc.data();
        filteredData.push({ ...data, projectId } as ProjectProps);
      });
      setProjectData(filteredData);
      setMaxPage(Math.ceil(filteredData.length / SIZE));
    } catch (error) {
      console.error('프로젝트 Data Fetch 에러 :', error);
    }
  };

  useEffect(() => {
    fetchProjectData().then(() => setIsLoading(false));
  }, [state]);

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
        <CategoryTitle>{projectState} 프로젝트</CategoryTitle>
        <BreadCrumb>갤러리 &gt; 프로젝트 &gt; {projectState} 프로젝트</BreadCrumb>
      </CategoryTitleSection>
      <ImageSection>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          getPaginatedData()?.map((item, index) => {
            return (
              <ImageWrapper
                key={index}
                imageUrl={item.imageUrl}
                projectId={item.projectId}
                name={item.name}
                description={item.description}
                participants={item.participants}
                state={item.state}
              />
            );
          })
        )}
        {projectData?.length === 0 && <div>{projectState} 프로젝트가 없습니다.</div>}
      </ImageSection>
      {projectData?.length !== 0 && (
        <ButtonSection>
          <Button onClick={goToPreviousPage} style={prevButtonStyle}>
            이전
          </Button>
          <Button onClick={goToNextPage} style={nextButtonStyle}>
            다음
          </Button>
        </ButtonSection>
      )}
    </GalleryMainContainer>
  );
};

export default Project;

export const GalleryMainContainer = styled.div`
  width: 100%;
  padding: 10px 30px 30px;
`;

export const ImageSection = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 0 5%;
  margin-top: 30px;
`;

const ButtonSection = styled.div`
  margin-top: 30px;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  font-family: 'Noto Sans KR';
  width: 120px;
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
