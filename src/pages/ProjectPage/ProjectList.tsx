import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebaseSDK";

interface Project {
  id: string; // Firestore 문서의 ID를 저장할 필드 추가
  projectTitle: string;
  projectContent: string;
  projectDeadline: string;
  projectMember: number;
  projectTeamName: string;
}

const ProjectList: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "project"));

        const projectData: Project[] = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data() as Project;
          projectData.push({ ...data });
        });

        setProjects(projectData);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>프로젝트 목록</h2>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>
            <h3>
              <Link to={`/project/${project.id}`}>{project.projectTitle}</Link>
            </h3>
            <p>{project.projectContent}</p>
            <p>팀명: {project.projectTeamName}</p>
            <p>참여 인원: {project.projectMember}</p>
            <p>마감일: {project.projectDeadline}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectList;
