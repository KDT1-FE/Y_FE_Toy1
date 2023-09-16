import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseSDK";
import {
  Container,
  TeamName,
  DivContainer,
  Date,
  DetailTitle,
  DetailContent,
  ListBtn,
  UpdateDiv,
  DeleteDiv,
  BtnDiv,
} from "../../styled/ProjectPage/ProjectDetail.styles";

const ProjectDetail: React.FC = () => {
  const [project, setProject] = useState<DocumentData | undefined>({});
  const { projectId } = useParams<{ projectId: string }>(); // RouteParams로 변경
  const navigate = useNavigate();

  // 프로젝트 정보 가져오기 함수
  const FetchProjectData = async (): Promise<void> => {
    try {
      const docRef = doc(db, "project", String(projectId)); // projectId를 그대로 사용
      const docSnap = (await getDoc(docRef)).data();

      setProject(docSnap);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    FetchProjectData();
  }, [projectId]); // projectId를 의존성 배열에 추가

  return (
    <Container>
      <DivContainer>
        <TeamName>{project?.projectTeamName} Project</TeamName>
        <BtnDiv>
          <UpdateDiv>수정</UpdateDiv>
          <DeleteDiv>삭제</DeleteDiv>
        </BtnDiv>
      </DivContainer>
      <Date>마감일: {project?.projectDeadline}</Date>
      <Date>프로젝트 인원: {project?.projectMember}</Date>
      <DetailTitle>{project?.projectTitle}</DetailTitle>
      <DetailContent>{project?.projectContent}</DetailContent>
      <ListBtn onClick={() => navigate(`/projectList`)}>목록으로</ListBtn>
    </Container>
  );
};

export default ProjectDetail;
