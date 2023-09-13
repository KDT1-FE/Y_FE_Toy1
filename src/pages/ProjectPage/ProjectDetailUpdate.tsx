import React, { useState } from "react";

export default function ProjectInputPage() {
  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [teamMembers, setTeamMembers] = useState("");

  const handleSubmit = () => {
    // 입력한 정보를 처리하는 로직을 작성합니다.
    // 여기에서는 간단히 콘솔에 출력합니다.
    console.log("프로젝트 이름:", projectName);
    console.log("제목:", title);
    console.log("설명:", description);
    console.log("기한:", deadline);
    console.log("인원:", teamMembers);
  };

  return (
    <div>
      <h2>프로젝트 정보 입력</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>프로젝트 이름:</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </div>
        <div>
          <label>제목:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>설명:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>기한:</label>
          <input
            type="text"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div>
          <label>인원:</label>
          <input
            type="text"
            value={teamMembers}
            onChange={(e) => setTeamMembers(e.target.value)}
          />
        </div>
        <div>
          <button type="submit">제출</button>
        </div>
      </form>
    </div>
  );
}
