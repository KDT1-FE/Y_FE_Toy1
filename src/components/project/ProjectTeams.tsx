import { UsergroupAddOutlined } from "@ant-design/icons";
import React from "react";
import styled from "styled-components";

const ProjectTeams = ({ teams }: { teams?: string[] }) => {
  return (
    <ProjectTeamsInfo>
      <UsergroupAddOutlined />
      {teams?.map((team) => (
        <span className="text-block team-block" key={team}>
          {team}
        </span>
      ))}
    </ProjectTeamsInfo>
  );
};

export default ProjectTeams;

const ProjectTeamsInfo = styled.div`
  margin-bottom: 6px;
  .text-block {
    display: inline-block;
    font-size: 12px;
    padding: 3px 5px;
    margin-left: 6px;
    &.team-block {
      background-color: #8ddfcb;
    }
  }
`;
