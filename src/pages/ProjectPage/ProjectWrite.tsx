import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  collection,
  addDoc,
  doc,
  setDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore"; // Firebase Firestore에서 필요한 함수 가져오기
import { db } from "../../firebaseSDK"; // Firebase 설정 가져오기

const ProjectWrite: React.FC = () => {
  const navigate = useNavigate(); // useNavigate Hook을 사용합니다.
  const [projectData, setProjectData] = useState({
    projectIndex: 0,
    projectTeamName: "",
    projectDeadline: "",
    projectMember: 0,
    projectTitle: "",
    projectContent: "",
  });

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

    // Firestore에 데이터 추가 및 인덱스 업데이트
    try {
      const projectCollection = collection(db, "project"); // "project" 컬렉션을 대상으로 합니다.

      // 현재 프로젝트 개수를 가져와서 다음 인덱스를 설정합니다.
      const projectQuery = query(
        projectCollection,
        orderBy("projectIndex", "desc")
      );
      const projectQuerySnapshot = await getDocs(projectQuery);
      const currentProjectCount = projectQuerySnapshot.size;
      const nextProjectIndex = currentProjectCount + 1;

      // 새 문서 추가
      const newDocRef = await addDoc(projectCollection, projectData);

      // 추가된 문서의 인덱스 필드 업데이트
      const newDocId = newDocRef.id;
      const newDoc = doc(projectCollection, newDocId);
      await setDoc(newDoc, { projectIndex: nextProjectIndex }, { merge: true });

      // 프로젝트가 추가되면 원하는 경로로 리디렉션
      navigate(`/project/${newDocId}`);
      console.log(newDocId);
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <div>
      <h2>새 프로젝트 만들기</h2>
      <form onSubmit={handleSubmit}>
        <button type="submit">프로젝트 생성</button>
        <div>
          <input
            type="text"
            id="projectTeamName"
            name="projectTeamName"
            placeholder="팀명을 입력해주세요"
            value={projectData.projectTeamName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="date"
            id="projectDeadline"
            name="projectDeadline"
            placeholder="프로젝트 마감일을 입력해주세요"
            value={projectData.projectDeadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
            type="number"
            id="projectMember"
            name="projectMember"
            placeholder="프로젝트 참여 인원을 입력해주세요"
            value={projectData.projectMember}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <input
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
          <input
            type="text"
            id="projectContent"
            name="projectContent"
            placeholder="프로젝트를 설명해주세요"
            value={projectData.projectContent}
            onChange={handleChange}
            required
          />
        </div>
      </form>
    </div>
  );
};

export default ProjectWrite;
