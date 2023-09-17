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
} from "../../styled/ProjectPage/ProjectWrite.styles";

const ProjectEdit: React.FC = () => {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();
  const [projectData, setProjectData] = useState({
    projectTeamName: "",
    projectDeadline: "",
    projectMember: 0,
    projectTitle: "",
    projectContent: "",
  });
  const firstInputRef = useRef<HTMLInputElement | null>(null); // Ref 생성

  useEffect(() => {
    const fetchProjectData = async () => {
      try {
        const docRef = doc(db, "project", String(projectId));
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProjectData(docSnap.data() as any);
        } else {
          // Handle the case where the project with the given ID doesn't exist
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

      // Redirect to the project details page after the update
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.error("Error updating project: ", error);
    }
  };

  return (
    <Container>
      <WriteDiv>
        <WriteProject>Edit Project</WriteProject>
        <form onSubmit={handleSubmit}>
          <Submit type="submit">저장</Submit>
        </form>
      </WriteDiv>
      {/* Render form inputs with existing project data */}
      <div>
        <WriteInput
          type="text"
          id="projectTeamName"
          name="projectTeamName"
          placeholder="Team Name"
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
          placeholder="Project Title"
          value={projectData.projectTitle}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteContentInput
          id="projectContent"
          name="projectContent"
          placeholder="Project Description"
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
          placeholder="Deadline (e.g., 2023-09-22)"
          value={projectData.projectDeadline}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <WriteInput
          type="number"
          id="projectMember"
          name="projectMember"
          placeholder="Number of Members"
          value={projectData.projectMember}
          onChange={handleChange}
          required
        />
      </div>
    </Container>
  );
};

export default ProjectEdit;
