import React, {useState, useEffect} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import {CAN_NOT_FOUND} from "../../constant";
import PostTeam from "./PostTeam";

function TeamCard({teamName}: {teamName: string}) {
  const teamString = sessionStorage.getItem(teamName);
  let team = {멘티: "", 멘토: "", img: "", content: ""};
  const [text, setText] = useState("");
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [teamContent, setTeamContent] = useState("");

  teamString ? (team = JSON.parse(teamString)) : CAN_NOT_FOUND;

  useEffect(() => {
    setText(team.content);
    setTeamContent(team.content);
  }, []);

  const clickEdit = () => {
    setIsEditorOpen(!isEditorOpen);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
    setText(e.target.value);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    PostTeam(teamName, text, team.멘티, team.멘토, team.img).then(() => {
      setIsEditorOpen(false);
      setTeamContent(text);
      setText(text);
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
            defaultValue={teamContent}
          />
        ) : (
          <ReactMarkdown
            className="markdown-body markdownBodyTeam"
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
