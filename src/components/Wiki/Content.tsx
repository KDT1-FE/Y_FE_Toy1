import React, {useEffect, useState} from "react";
import "../../styles/wiki/wiki.css";
import "../../styles/wiki/reactMarkdown.css";
import {useParams} from "react-router-dom";
import Loading from "../Loading";
import EditButton from "./EditButton";
import TeamContent from "./TeamContent";
import OtherContent from "./OtherContent";
import {ReactComponent as RefreshIcon} from "../../assets/icons/Refresh.svg";

function Content() {
  const {id} = useParams() as {id: string};
  // isLoading : 로딩 상태
  const [isLoading, setisLoading] = useState(true);
  // dataKey : db 검색용 url 파라미터
  const [text, setText] = useState("");
  // content : db에서 불러온 글
  const [content, setContent] = useState("");
  // title : db에서 불러온 title
  const [title, setTitle] = useState("커리큘럼");
  // isEditorOpen : 수정 버튼 상태
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  // isTeamContent : 페이지 상태
  const [isTeamContent, setisTeamContent] = useState(false);

  useEffect(() => {
    setisLoading(true);

    if (!id) {
      setTitle("커리큘럼");

      const contentString = sessionStorage.getItem("커리큘럼");

      if (contentString) {
        setContent(JSON.parse(contentString).content);
      }
    } else {
      setTitle(id);

      setIsEditorOpen(false);

      if (id === "팀 구성") {
        setisTeamContent(true);
      } else {
        setisTeamContent(false);
      }

      const contentString = sessionStorage.getItem(id);

      if (contentString) {
        setContent(JSON.parse(contentString).content);
        setText(content);
      }
    }

    setTimeout(() => {
      setisLoading(false);
    }, 1000);
  }, [id]);

  useEffect(() => {
    setText(content);
  }, [content]);

  const updateContent = () => {
    const newContent = sessionStorage.getItem(title);

    if (newContent) {
      setContent(JSON.parse(newContent).content);
      if (isEditorOpen) {
        setText(content);
        setIsEditorOpen(false);
      }
    }
  };

  return (
    <div className="WikiContentWrap">
      {isLoading ? <Loading /> : <div> </div>}
      <div className="ContentHeader">
        <h1 className="ContentTitle">{title}</h1>
        {isTeamContent ? (
          ""
        ) : (
          <div className="FeatBtns">
            <div className="RefreshBtnWrap" title="refresh">
              <RefreshIcon className="ButtonIcon" onClick={updateContent} />
              <span className="RefreshLabel">refresh</span>
            </div>
            <EditButton
              isEditorOpen={isEditorOpen}
              setIsEditorOpen={setIsEditorOpen}
            />
          </div>
        )}
      </div>

      {isTeamContent ? (
        <TeamContent />
      ) : (
        <OtherContent
          isEditorOpen={isEditorOpen}
          dataKey={title}
          text={text}
          content={content}
          setContent={setContent}
          setIsEditorOpen={setIsEditorOpen}
        />
      )}
    </div>
  );
}

export default Content;
