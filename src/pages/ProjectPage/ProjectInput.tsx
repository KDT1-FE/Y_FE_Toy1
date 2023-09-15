import React, { useState } from "react";

export default function ProjectInputPage() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div>
      <h2>Team Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <button type="submit">제출</button>
        </div>
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
      </form>
    </div>
  );
}
