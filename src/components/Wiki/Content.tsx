import React, {useEffect, useState} from "react";
import "../../styles/wiki/wiki.css";
import "../../styles/wiki/reactMarkdown.css";
import {useParams} from "react-router-dom";
import swal from "sweetalert";
import Loading from "../Loading";
import EditButton from "./EditButton";
import TeamContent from "./TeamContent";
import OtherContent from "./OtherContent";
import {ReactComponent as RefreshIcon} from "../../assets/icons/Refresh.svg";
import {
  LOADING_TIME,
  UPDATE_DOC_TITLE,
  UPDATE_DOC_TEXT,
  UPDATE_DOC_DONE,
} from "../../constant";

function Content(): JSX.Element {
  const {id} = useParams() as {id: string};
  // isLoading : 로딩 상태
  const [isLoading, setisLoading] = useState<boolean>(true);
  // text : 사용자가 입력한 글
  const [text, setText] = useState<string>("");
  // content : db에서 불러온 글
  const [content, setContent] = useState<string>("");
  // title : db에서 불러온 title
  const [title, setTitle] = useState<string>("커리큘럼");
  // isEditorOpen : 수정 버튼 상태
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  // isTeamContent : 페이지 상태
  const [isTeamContent, setisTeamContent] = useState<boolean>(false);

  useEffect(() => {
    setisLoading(true);

    if (!id) {
      setTitle("커리큘럼");

      const contentString = sessionStorage.getItem("커리큘럼");

      if (contentString) {
        setContent(JSON.parse(contentString).content);
      }
    } else {
      const contentString = sessionStorage.getItem(id);

      setTitle(id);
      setIsEditorOpen(false);

      if (id === "팀 구성") {
        setisTeamContent(true);
      } else {
        setisTeamContent(false);
      }

      if (contentString) {
        setContent(JSON.parse(contentString).content);
        setText(content);
      }
    }

    setTimeout(() => {
      setisLoading(false);
    }, LOADING_TIME);
  }, [id]);

  useEffect(() => {
    setText(content);
  }, [content]);

  const updateContent = (): void => {
    swal({
      title: UPDATE_DOC_TITLE,
      text: UPDATE_DOC_TEXT,
      buttons: ["취소", true],
      icon: "warning",
      dangerMode: true,
    }).then(willDelete => {
      if (willDelete) {
        const newContent = sessionStorage.getItem(title);

        if (newContent) {
          setContent(JSON.parse(newContent).content);
          if (isEditorOpen) {
            setText(content);
            setIsEditorOpen(false);
          }
        }

        swal(UPDATE_DOC_DONE, {
          icon: "success",
        });
      }
    });
  };

  return (
    <div className="WikiContentWrap">
      {isLoading ? <Loading /> : <div className="None"> </div>}
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
