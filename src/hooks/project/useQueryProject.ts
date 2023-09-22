import { useState, useEffect } from "react";
import { db } from "../../libs/firebase";
import { doc, getDoc } from "firebase/firestore";
import { ProjectDetail, projectDetailConverter } from "../../libs/firestore";
import { useLocation } from "react-router-dom";

export const useQueryProject = (): [
  projectDetail: ProjectDetail | undefined,
  isLoaded: boolean,
] => {
  const location = useLocation();
  const projectId = location.pathname.split("/")[2];
  const [isLoaded, setIsLoaded] = useState(false);
  const [projectDetail, setProjectDetail] = useState<ProjectDetail>();

  useEffect(() => {
    if (projectId === undefined) return;
    (async () => {
      try {
        const docRef = doc(db, "Project", projectId).withConverter(
          projectDetailConverter,
        );
        const docSn = await getDoc(docRef);
        if (docSn.exists()) {
          const data = docSn.data();
          setProjectDetail(data);
        }
      } catch (error) {
        if (error instanceof Error) console.error(error.message);
      } finally {
        setIsLoaded(true);
      }
    })();
    return () => {
      setIsLoaded(false);
    };
  }, [projectId]);
  return [projectDetail, isLoaded];
};
