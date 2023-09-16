import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseSDK";

interface Project {
  projectIndex: number;
  projectTitle: string;
  projectContent: string;
  projectDeadline: string;
  projectMember: number;
  projectTeamName: string;
}

interface RouteParams {
  [key: string]: string;
  projectId: string; // 다시 RouteParams로 변경
}

const ProjectDetail: React.FC = () => {
  const [project, setProject] = useState<Project | null>(null);
  const { projectId } = useParams<RouteParams>(); // RouteParams로 변경

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Firestore에서 프로젝트 문서 참조를 만듭니다.
        const projectDocRef = doc(db, "project", String(projectId));
        console.log(projectId);
        // 문서 참조를 사용하여 문서 데이터를 가져옵니다.
        const docSnap = await getDoc(projectDocRef);

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
  }, [projectId]);

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
