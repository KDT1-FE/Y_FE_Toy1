import React, {useState} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import ReadTeam from "./ReadTeam";
import PostTeam from "./PostTeam";

function TeamCard({teamName}: {teamName: string}) {
  const teamString = sessionStorage.getItem(teamName);
  let team = {멘티: "", 멘토: "", img: "", content: ""};
  const [text, setText] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [teamContent, setTeamContent] = useState("");

  teamString
    ? (team = JSON.parse(teamString))
    : "팀 컨텐츠를 찾을 수 없습니다.";

  ReadTeam(teamName).then(teamData => {
    setTeamContent(teamData.content);

    if (!text) {
      setText(teamContent);
    }
  });

  const clickEdit = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setText(text);
    PostTeam(teamName, text).then(() => {
      setIsEditorOpen(false);
    });
  };

  return (
    <div className="TeamContent">
      <div className="TeamCard">
        <img className="TeamImg" src={team.img} alt="팀 이미지" />
        <div className="TeamCardBg">
          <div className="TeamText">
            <p className="TeamName">{teamName}</p>
            <p className="Mentor">{team.멘티}</p>
            <p className="Mentee">{team.멘토}</p>
          </div>
        </div>
      </div>
      <div className="TeamCardContent">
        {isEditorOpen ? (
          <textarea
            className="TeamCardTextarea"
            onChange={onChange}
            defaultValue={text}
          />
        ) : (
          <ReactMarkdown
            className="markdown-body markdown-body-team"
            remarkPlugins={[remarkGfm]}
            rawSourcePos
            rehypePlugins={[rehypeRaw as any]}
          >
            {teamContent}
          </ReactMarkdown>
        )}
        <div className="TeamCardBtns">
          <button className="TeamCardEditBtn" type="button" onClick={clickEdit}>
            {isEditorOpen ? "Cancel" : "Edit"}
          </button>
          {isEditorOpen ? (
            <form className="TeamCardForm" onSubmit={onSubmit}>
              <button className="TeamCardSubmitBtn" type="submit">
                submit
              </button>
            </form>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}

export default TeamCard;
