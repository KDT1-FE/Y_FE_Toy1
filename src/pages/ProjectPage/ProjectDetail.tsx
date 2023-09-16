import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseSDK";

interface Project {
  projectNum: string;
  projectTitle: string;
  projectContent: string;
  projectDeadline: string;
  projectMember: number;
  projectTeamName: string;
}

const ProjectDetail: React.FC = () => {
  const { projectNum } = useParams<{ projectNum: string }>();
  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const docRef = doc(db, "project", String(projectNum));
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as Project;
          setProject(data);
        } else {
          console.log("프로젝트가 없습니다.");
        }
      } catch (error) {
        console.error("Error fetching project data: ", error);
      }
    };

    fetchData();
  }, [projectNum]);

  return (
    <div>
      <h2>프로젝트 상세 정보</h2>
      {project ? (
        <div>
          <h3>{project.projectTitle}</h3>
          <p>{project.projectContent}</p>
          <p>팀명: {project.projectTeamName}</p>
          <p>참여 인원: {project.projectMember}</p>
          <p>마감일: {project.projectDeadline}</p>
          <button>수정</button>
          <button>삭제</button>
        </div>
      ) : (
        <p>프로젝트 정보를 불러오는 중...</p>
      )}
    </div>
  );
};
export default ProjectDetail;
