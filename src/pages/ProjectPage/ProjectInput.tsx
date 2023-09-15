import React, { useState } from "react";

export default function ProjectInputPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 입력한 정보를 서버로 보내거나 다른 작업을 수행할 수 있습니다.
    console.log("프로젝트 제목:", projectTitle);
    console.log("프로젝트 설명:", projectDescription);
    console.log("인원:", teamSize);
    console.log("기한:", deadline);
  };

  return (
    <div>
      <h2>Team Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="projectTitle">프로젝트 제목:</label>
          <input
            type="text"
            id="projectTitle"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="projectDescription">프로젝트 설명:</label>
          <textarea
            id="projectDescription"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="teamSize">인원:</label>
          <input
            type="number"
            id="teamSize"
            value={teamSize}
            onChange={(e) => setTeamSize(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="deadline">기한:</label>
          <input
            type="date"
            id="deadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">제출</button>
        </div>
      </form>
    </div>
  );
}
