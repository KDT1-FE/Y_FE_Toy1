import React, {useEffect, useState} from "react";
import "../../styles/wiki/wiki.css";
import "../../styles/wiki/reactMarkdown.css";
import {useParams} from "react-router-dom";
import ReadWiki from "./ReadWiki";
import Loading from "../Loading";
import SaveTeam from "./SaveTeam";
import EditButton from "./EditButton";
import TeamContent from "./TeamContent";
import OtherContent from "./OtherContent";

function Content() {
  const {id} = useParams() as {id: string};
  // isLoading : 로딩 상태
  const [isLoading, setisLoading] = useState(true);
  // dataKey : db 검색용 url 파라미터
  const [dataKey, setDataKey] = useState("커리큘럼");
  // text : texrarera 에서 불러온 글
  const [text, setText] = useState("");
  // content : db에서 불러온 글
  const [content, setContent] = useState("");
  // title : db에서 불러온 title
  const [title, setTitle] = useState("커리큘럼");
  // isEditorOpen : 수정 버튼 상태
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  // isTeamContent : 페이지 상태
  const [isTeamContent, setisTeamContent] = useState(false);

  // id가 변경될 경우, dataKey 변경
  useEffect(() => {
    setisLoading(true);
    setDataKey(id);
    setIsEditorOpen(false);

    if (id === "팀구성") {
      setisTeamContent(true);
    } else {
      setisTeamContent(false);
    }

    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, [id]);

  // ReadWiki 함수로 content 가져오기
  if (dataKey) {
    ReadWiki(dataKey).then(doc => {
      setContent(doc.content);
      setTitle(doc.title);
      setText(doc.content);
    });
  }

  SaveTeam();

  return (
    <div className="WikiContentWrap">
      {isLoading ? <Loading /> : <div> </div>}
      <div className="ContentHeader">
        <h1 className="ContentTitle">{title}</h1>
        {isTeamContent ? (
          ""
        ) : (
          <EditButton
            isEditorOpen={isEditorOpen}
            setIsEditorOpen={setIsEditorOpen}
          />
        )}
      </div>

      {isTeamContent ? (
        <TeamContent />
      ) : (
        <OtherContent
          isEditorOpen={isEditorOpen}
          dataKey={dataKey}
          text={text}
          content={content}
          setIsEditorOpen={setIsEditorOpen}
        />
      )}
    </div>
  );
}

export default Content;
