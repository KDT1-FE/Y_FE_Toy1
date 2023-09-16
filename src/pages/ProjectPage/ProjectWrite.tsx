import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore"; // Firebase Firestore에서 필요한 함수 가져오기
import { db } from "../../firebaseSDK"; // Firebase 설정 가져오기

const ProjectWrite: React.FC = () => {
  const navigate = useNavigate(); // useNavigate Hook을 사용합니다.
  const [projectData, setProjectData] = useState({
    teamName: "",
    deadline: "",
    member: 0,
    title: "",
    description: "",
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

    // Firestore에 데이터 추가
    try {
      const projectCollection = collection(db, "project"); // "projects" 컬렉션을 대상으로 합니다.
      await addDoc(projectCollection, projectData);

      // 프로젝트가 추가되면 원하는 경로로 리디렉션
      navigate("/projects");
    } catch (error) {
      console.error("Error adding project: ", error);
    }
  };

  return (
    <div>
      <h2>새 프로젝트 만들기</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="teamName">팀명:</label>
          <input
            type="text"
            id="teamName"
            name="teamName"
            value={projectData.teamName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">기한:</label>
          <input
            type="date"
            id="deadline"
            name="deadline"
            value={projectData.deadline}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="member">참여 인원:</label>
          <input
            type="number"
            id="member"
            name="member"
            value={projectData.member}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="title">제목:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">설명:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">프로젝트 생성</button>
      </form>
    </div>
  );
};

export default ProjectWrite;
