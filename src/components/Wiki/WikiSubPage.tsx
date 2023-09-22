import React, { useEffect } from "react";

// Components
import WikiEditor from "./WikiEditor";
import WikiViewer from "./WikiViewer";

// Style
import styled from "styled-components";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import {
  currentFolderTitle,
  currentFileTitle,
  currentItem,
} from "../../store/wiki";

// Interface
import { IWiki } from "../../store/wiki";

// Firebase
import { db } from "../../libs/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  Timestamp,
} from "firebase/firestore";

export interface IItem {
  fileName: string;
  subName: string;
  date?: Timestamp;
  name?: string;
  position?: string;
  department?: string;
  photo?: string;
}

const SubPage = () => {
  const currentFolder = useRecoilValue(currentFolderTitle);
  const currentFile = useRecoilValue(currentFileTitle);
  const [item, setItem] = useRecoilState(currentItem);

  const refreshFile = async () => {
    const q = query(
      collection(db, "WikiPage"),
      where("title", "==", currentFolder),
    );
    const querySnapshot = await getDocs(q);
    const FolderDoc = querySnapshot.docs[0];
    if (FolderDoc === undefined) {
      const q = query(collection(db, "WikiPage"));
      const querySnapshot = await getDocs(q);
      querySnapshot.docs.map((doc) => doc.data() as IWiki);
    } else {
      const items = FolderDoc.data().items || [];
      const item = await items.find(
        (item: IItem) => item.fileName === currentFile,
      );
      setItem(item);
    }
  };

  useEffect(() => {
    refreshFile();
  }, [currentFile]);

  return (
    <Container>
      <StyledCurrent>
        {currentFolder} / {currentFile}
      </StyledCurrent>
      <br />
      <div>
        {item && (
          <>
            {item.subName === "" ? (
              <WikiEditor />
            ) : (
              <WikiViewer content={item} />
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default SubPage;

const Container = styled.div`
  span {
    opacity: 0.4;
    font-size: 0.85rem;
  }
`;
const StyledCurrent = styled.div`
  margin-top: 8px;
  opacity: 0.4;
  font-size: 0.85rem;
`;
