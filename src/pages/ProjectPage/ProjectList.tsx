import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseSDK";
import ProjectSVG from "./components/ProjectSVG";
import Progress from "../../assets/img/Progress.svg";
import Complete from "../../assets/img/Complete.svg";

import {
  Container,
  TitleContainer,
  WriteBtn,
  WriteText,
  ListItem,
  ProjectTitle,
  Member,
  Deadline,
  TeamName,
  List,
  SVG,
  ProgressDiv,
  Ing,
  ProgressImg,
} from "../../styled/ProjectPage/ProjectList.styles";

interface Project {
  id: string; // Firestore 문서의 ID를 저장할 필드 추가
  projectProgress: string; //
  projectTitle: string;
  projectContent: string;
  projectDeadline: string;
  projectMember: number;
  projectTeamName: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "project"));

        const projectData: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Project;
          // Firestore 문서의 ID를 project 객체에 추가
          projectData.push({ ...data, id: doc.id });
        });

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container>
      <TitleContainer>
        <WriteText>Team Project</WriteText>
        <WriteBtn onClick={() => navigate(`/projectwrite`)}>
          프로젝트 작성하기
        </WriteBtn>
      </TitleContainer>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <TeamName
              onClick={() => navigate(`/project/${project.id}`)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  navigate(`/project/${project.id}`);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <SVG>
                <ProjectSVG />
                {project.projectTeamName} Project
                <ProgressDiv
                  className={
                    project.projectProgress === "진행중"
                      ? "inProgress"
                      : "completed"
                  }
                >
                  <Ing
                    className={
                      project.projectProgress === "진행중"
                        ? "inProgress"
                        : "completed"
                    }
                  >
                    {project.projectProgress}
                  </Ing>
                  {project.projectProgress === "진행중" ? (
                    <ProgressImg src={Progress} alt="진행 중 이미지" />
                  ) : (
                    <ProgressImg src={Complete} alt="완료 이미지" />
                  )}
                </ProgressDiv>
              </SVG>
            </TeamName>
            <List>
              <ListItem>
                <ProjectTitle>주제: </ProjectTitle>
                <ProjectTitle>{project.projectTitle}</ProjectTitle>
              </ListItem>
              <ListItem>
                <Deadline>마감일:</Deadline>
                <Deadline>{project.projectDeadline}</Deadline>
              </ListItem>
              <ListItem>
                <Member>인원: </Member>
                <Member>{project.projectMember}</Member>
              </ListItem>
            </List>
          </li>
        ))}
      </ul>
    </Container>
  );
};

export default ProjectList;
