import { useEffect, useState } from "react";
import { Wiki } from "../wiki/WikiCommonType";
import * as style from "./wikiPreviewtyle";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface Props {
  wikiData: Wiki;
}

export default function WikiPreview({ wikiData }: Props) {
  const { parentID, wikiID, title, content } = wikiData;
  const [parentTitle, setParentTitle] = useState("");
  useEffect(() => {
    const getParentTitle = async () => {
      if (parentID) {
        const docRef = doc(db, "Wiki", parentID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setParentTitle(docSnap.data().title);
        }
      } else {
        setParentTitle("전체");
      }
    };
    getParentTitle();
  }, []);

  return (
    <style.Container to={`/wiki?wikiID=${wikiID}`}>
      <style.WikiCategory>{parentTitle}</style.WikiCategory>
      <style.WikiTitle>{title}</style.WikiTitle>
      <style.WikiDescription>{content}</style.WikiDescription>
    </style.Container>
  );
}
