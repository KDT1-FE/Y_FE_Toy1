import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { DocumentData, doc, getDoc, deleteDoc } from "firebase/firestore";
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
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const FetchProjectData = async (): Promise<void> => {
    try {
      const docRef = doc(db, "project", String(projectId));
      const docSnap = (await getDoc(docRef)).data();

      setProject(docSnap);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    FetchProjectData();
  }, [projectId]);

  const handleDelete = async (): Promise<void> => {
    try {
      const docRef = doc(db, "project", String(projectId));
      await deleteDoc(docRef);
      navigate(`/projectList`); // 삭제 후 목록 페이지로 리디렉션
    } catch (error) {
      console.log("Error deleting project: ", error);
    }
  };

  return (
    <Container>
      <DivContainer>
        <TeamName>{project?.projectTeamName} Project</TeamName>
        <BtnDiv>
          <UpdateDiv onClick={() => navigate(`/project/edit/${projectId}`)}>
            수정
          </UpdateDiv>
          <DeleteDiv onClick={handleDelete}>삭제</DeleteDiv>
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
