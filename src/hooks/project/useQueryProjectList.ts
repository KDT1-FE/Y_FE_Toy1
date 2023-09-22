import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../libs/firebase";
import { projectConverter, ProjectInfo } from "../../libs/firestore";
import { projectListType } from "../../store/project";

const useQueryProjectList = (
  teamName?: string,
): [
  teamProj: projectListType | undefined,
  setTeamProj: React.Dispatch<
    React.SetStateAction<projectListType | undefined>
  >,
  isLoaded: boolean,
] => {
  const [teamProj, setTeamProj] = useState<projectListType>();
  const [isLoaded, setIsLoaded] = useState(false);

  const teamProjQuery = async (teamName?: string) => {
    let data: projectListType = {};
    const projectPlus: ProjectInfo[] = [];
    const projectProgress: ProjectInfo[] = [];
    const projectCompleted: ProjectInfo[] = [];
    const q = teamName
      ? query(
          collection(db, "Project").withConverter(projectConverter),
          where("teams", "array-contains", teamName),
          orderBy("order", "desc"),
        )
      : query(
          collection(db, "Project").withConverter(projectConverter),
          orderBy("order", "desc"),
        );
    const sn = await getDocs(q);
    sn.forEach((project) => {
      const data = project.data();
      switch (data.status) {
        case "plus":
          projectPlus.unshift(data);
          break;
        case "progress":
          projectProgress.unshift(data);
          break;
        case "completed":
          projectCompleted.unshift(data);
          break;
      }
    });
    data = {
      plus: projectPlus,
      progress: projectProgress,
      completed: projectCompleted,
    };
    return data;
  };

  useEffect(() => {
    try {
      (async () => {
        // 유저 정보가 있으면 소속팀 프로젝트 불러오기
        const data = await teamProjQuery(teamName);
        setTeamProj(data);
      })();
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  return [teamProj, setTeamProj, isLoaded];
};

export default useQueryProjectList;
