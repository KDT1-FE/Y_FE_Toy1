import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { useState, useEffect } from "react";
import { firestoreDb } from "../../libs/firebase";
import {
  ProjectInfo,
  WikiList,
  projectConverter,
  wikiListConverter,
} from "../../libs/firestore";

const useQueryWidget = (): [
  wikis: WikiList | undefined,
  projects: ProjectInfo[] | undefined,
  isLoaded: boolean,
] => {
  const [wikis, setWikis] = useState<WikiList>();
  const [projects, setProjects] = useState<ProjectInfo[]>();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    // 목록 가져오기
    try {
      // 시도
      const wikiQuery = doc(
        firestoreDb,
        "WikiPage",
        "pw62WdDcJRjhnJh5NLzz",
      ).withConverter(wikiListConverter);
      const projQuery = query(
        collection(firestoreDb, "Project").withConverter(projectConverter),
        orderBy("order", "desc"),
      );
      (async () => {
        const docSn = await getDoc(wikiQuery);
        const querySn = await getDocs(projQuery);
        const data: ProjectInfo[] = [];

        if (docSn.exists()) {
          setWikis(docSn.data());
        }
        querySn.forEach((doc) => {
          data.push(doc.data());
        });
        setProjects(data);
      })();
      // 성공 시
    } catch (error) {
      // 실패
      if (error instanceof Error) {
        console.error(error.message);
      }
    } finally {
      // 최종
      setIsLoaded(true);
    }
  }, []);
  return [wikis, projects, isLoaded];
};

export default useQueryWidget;
