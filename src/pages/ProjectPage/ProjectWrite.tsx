import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../../firebaseSDK";
import {
  Container,
  WriteDiv,
  Submit,
  WriteProject,
  WriteInput,
  WriteContentInput,
} from "../../styled/ProjectPage/ProjectWrite.styles";

const ProjectWrite: React.FC = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState({
    projectIndex: 0,
    projectTeamName: "",
    projectDeadline: "",
    projectMember: 0,
    projectTitle: "",
    projectContent: "",
  });

  // 첫 번째 인풋 요소에 대한 ref 생성
  const firstInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // 페이지가 로드될 때 첫 번째 인풋 요소에 포커스 설정
    if (firstInputRef.current) {
      firstInputRef.current.focus();
    }
  }, []);

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

    if (
      !projectData.projectTeamName ||
      !projectData.projectTitle ||
      !projectData.projectContent ||
      !projectData.projectDeadline ||
      !projectData.projectMember
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      const projectCollection = collection(db, "project");

      const projectQuery = query(
        projectCollection,
        orderBy("projectIndex", "desc")
      );
      const projectQuerySnapshot = await getDocs(projectQuery);
      const currentProjectCount = projectQuerySnapshot.size;
      const nextProjectIndex = currentProjectCount + 1;

      const newDocRef = await addDoc(projectCollection, projectData);

      const newDocId = newDocRef.id;
      const newDoc = doc(projectCollection, newDocId);
      await setDoc(newDoc, { projectIndex: nextProjectIndex }, { merge: true });

      navigate(`/project/${newDocId}`);
      console.log(newDocId);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <Container>
      <WriteDiv>
        <WriteProject>Team Project</WriteProject>
        <form onSubmit={handleSubmit}>
          <Submit type="submit">등록</Submit>
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
          type="number"
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

export default ProjectWrite;
