import React, { useEffect, useState } from "react";
import { db } from "../../libs/firebase";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";
import styled from "styled-components";
import { theme } from "antd";
import { Link } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { currentFileTitle, currentFolderTitle } from "../../store/wiki";
import { IWikiItem } from "../../store/wiki";

const MainWikiWidget = () => {
  const {
    token: { colorPrimary },
  } = theme.useToken();

  const [fileNames, setFileNames] = useState<string[]>([]);
  const setCurrentFolderTitle = useSetRecoilState(currentFolderTitle);
  const setCurrentFileTitle = useSetRecoilState(currentFileTitle);

  useEffect(() => {
    const q = query(
      collection(db, "WikiPage"),
      orderBy("order"),
      where("title", "==", "FE3 WIKI 가이드"),
    );

    const fetchWikiData = async () => {
      try {
        const querySnapshot = await getDocs(q);
        const fileNames: string[] = [];
        querySnapshot.forEach((doc) => {
          const items: IWikiItem[] = doc.data().items;
          items.forEach((item) => {
            fileNames.push(item.fileName);
          });
        });
        setFileNames(fileNames);
      } catch (error) {
        console.error(error);
      }
    };

    fetchWikiData();
  }, []);

  const handleFileClick = (fileName: string) => {
    setCurrentFolderTitle("FE3 WIKI 가이드");
    setCurrentFileTitle(fileName);
  };

  return (
    <div>
      <BorderTitle $colorPrimary={colorPrimary}>위키 가이드</BorderTitle>
      <div>
        {fileNames.map((fileName, index) => (
          <WidgetItem key={index}>
            <p>
              <Link to={`/wiki`} onClick={() => handleFileClick(fileName)}>
                {fileName}
              </Link>
            </p>
          </WidgetItem>
        ))}
      </div>
    </div>
  );
};

export default MainWikiWidget;

export const BorderTitle = styled.h4<{ $colorPrimary: string }>`
  border-left: 3px solid ${(props) => props.$colorPrimary};
  padding: 6px 1rem;
`;

export const WidgetItem = styled.div`
  padding: 0.5rem 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dfdfdf;
  a {
    display: block;
    color: inherit;
  }
  p {
    margin: 0;
    flex: 1;
  }
  .list-date {
    color: #999;
  }
`;
