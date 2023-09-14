import React, {useEffect, useState} from "react";
import "../../styles/Wiki.css";
import "../../styles/ReactMarkdown.css";
import {useParams} from "react-router-dom";
import ReactMarkdown from "react-markdown";
import EditButton from "./EditButton";
import ReadContent from "./ReadContent";
import TextEditor from "./TextEditor";

function Content() {
  const {id} = useParams() as {id: string};
  // dataKey : db 검색용 url 파라미터
  const [dataKey, setDataKey] = useState<string>("");
  // isEditorOpen : 수정 버튼 상태
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  // content : db에서 불러온 글
  const [content, setContent] = useState<string>("");
  // title : db에서 불러온 title
  const [title, setTitle] = useState<string>("");

  // isEditorOpen 및 dataKey 세팅
  const initialSet = () => {
    setIsEditorOpen(false);
    if (id === undefined) {
      setDataKey("커리큘럼");
    } else {
      setDataKey(id);
    }
  };

  // dataKey가 변경될 경우, initialSet 호출
  useEffect(() => {
    initialSet();
  }, [id]);

  // ReadContent 함수로 content 가져오기
  if (dataKey) {
    ReadContent(dataKey).then(doc => {
      if (doc) {
        setContent(doc.content);
        setTitle(doc.title);
      }
    });
  }

  return (
    <div className="WikiContentWrap">
      <h1 id="ContentTitle">{title}</h1>
      <EditButton
        isEditorOpen={isEditorOpen}
        setIsEditorOpen={setIsEditorOpen}
      />
      <div id="main-content">
        {isEditorOpen ? (
          <TextEditor
            dataKey={dataKey}
            content={content}
            setIsEditorOpen={setIsEditorOpen}
          />
        ) : (
          <ReactMarkdown className="reactMarkdown">{content}</ReactMarkdown>
        )}
      </div>
    </div>
  );
}

export default Content;
