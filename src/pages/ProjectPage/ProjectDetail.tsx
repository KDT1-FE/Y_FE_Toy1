import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DocumentData, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebaseSDK";

const ProjectDetail: React.FC = () => {
  const [project, setProject] = useState<DocumentData | undefined>({});
  const { projectId } = useParams<{ projectId: string }>(); // RouteParams로 변경

  // 프로젝트 정보 가져오기 함수
  const FetchProjectData = async (): Promise<void> => {
    try {
      const docRef = doc(db, "project", String(projectId)); // projectId를 그대로 사용
      const docSnap = (await getDoc(docRef)).data();

      setProject(docSnap);
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    FetchProjectData();
  }, [projectId]); // projectId를 의존성 배열에 추가

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
