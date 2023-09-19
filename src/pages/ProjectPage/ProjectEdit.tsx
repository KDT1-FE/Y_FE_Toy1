import React, { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseSDK";
import {
  Container,
  WriteDiv,
  Submit,
  WriteProject,
  WriteInput,
  WriteContentInput,
  Ex,
  WriteEx,
} from "../../styled/ProjectPage/ProjectWrite.styles";
import {
  ProgressDiv,
  Ing,
  ProgressImg,
} from "../../styled/ProjectPage/ProjectList.styles";
import Progress from "../../assets/img/Progress.svg";
import Complete from "../../assets/img/Complete.svg";

const ProjectEdit: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState({
    projectProgress: "",
    projectTeamName: "",
    projectDeadline: "",
    projectMember: "",
    projectTitle: "",
    projectContent: "",
  });
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, "project", String(projectId));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectData(docSnap.data() as any);
        } else {
          console.log("Project not found.");
        }
      } catch (error) {
        console.error("Error fetching project data: ", error);
      }
    };
    fetchProjectData();
    // 컴포넌트가 마운트되면 첫 번째 인풋 요소에 포커스를 설정
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, [projectId]);
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProjectData({
      ...projectData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const projectRef = doc(db, "project", String(projectId));
      await updateDoc(projectRef, projectData);

      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  const handleProgressToggle = () => {
    const newProgress =
      projectData.projectProgress === "진행중" ? "완료" : "진행중";

    setProjectData({
      ...projectData,
      projectProgress: newProgress,
    });
  };

  return (
    <Container>
      <WriteEx>
        <ProgressDiv
          className={
            projectData.projectProgress === "진행중"
              ? "inProgress"
              : "completed"
          }
        >
          <Ing
            className={
              projectData.projectProgress === "진행중"
                ? "inProgress"
                : "completed"
            }
            onClick={handleProgressToggle}
          >
            {projectData.projectProgress}
          </Ing>
          {projectData.projectProgress === "진행중" ? (
            <ProgressImg src={Progress} alt="진행 중 이미지" />
          ) : (
            <ProgressImg src={Complete} alt="완료 이미지" />
          )}{" "}
        </ProgressDiv>
        <Ex>프로젝트 진행상황을 클릭해서 변경해주세요</Ex>
      </WriteEx>

      <WriteDiv>
        <WriteProject>Edit Project</WriteProject>
        <form onSubmit={handleSubmit}>
          <Submit type="submit">저장</Submit>
        </form>
      </WriteDiv>

      <div>
        <WriteInput
          type="text"
          id="projectTeamName"
          name="projectTeamName"
          placeholder="팀명을 입력해주세요"
          value={projectData.projectTeamName}
          onChange={handleChange}
          required
          ref={firstInputRef}
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectTitle"
          name="projectTitle"
          placeholder="프로젝트 주제를 입력해주세요"
          value={projectData.projectTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteContentInput
          id="projectContent"
          name="projectContent"
          placeholder="프로젝트를 설명해주세요"
          value={projectData.projectContent}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectDeadline"
          name="projectDeadline"
          placeholder="프로젝트 마감일을 입력해주세요 (ex.2023-09-22)"
          value={projectData.projectDeadline}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteInput
          type="text"
          id="projectMember"
          name="projectMember"
          placeholder="프로젝트 참여 인원을 입력해주세요"
          value={projectData.projectMember}
          onChange={handleChange}
          required
        />
      </div>
    </Container>
  );
};

export default ProjectEdit;
