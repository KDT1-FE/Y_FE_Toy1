import React, { useState, useEffect } from "react";
import "../styles/Project.css";
import ProjectSider from "../components/project/ProjectSider";
import { Layout } from "antd";
import ProjectDragDrop from "../components/project/ProjectDragDrop";

const Project = () => {
  const [teamName, setTeamName] = useState<string>();
  const userData = localStorage.getItem("userData");
  useEffect(() => {
    if (userData) {
      const { newUser } = JSON.parse(userData);
      setTeamName(newUser.team);
    }
  }, [userData]);

  return (
    <Layout>
      <ProjectSider />
      <div className="drag-drop-area">
        <div className="project__top-title">
          <h3>프로젝트</h3>
        </div>
        <h2>{teamName ? teamName + " 프로젝트" : "로그인 먼저 해주세요"}</h2>
        {teamName ? <ProjectDragDrop teamName={teamName} /> : null}
      </div>
    </Layout>
  );
};

export default Project;
