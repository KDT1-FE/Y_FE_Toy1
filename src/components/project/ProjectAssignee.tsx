import React from "react";
import { UserOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ProjectAssignee = ({ assignees }: { assignees?: string[] }) => {
  return (
    <ProjectAssigneeInfo>
      <UserOutlined />
      {assignees?.map((assignee) => (
        <span className="text-block user-block" key={assignee}>
          {assignee}
        </span>
      ))}
    </ProjectAssigneeInfo>
  );
};

export default ProjectAssignee;

const ProjectAssigneeInfo = styled.div`
  margin-bottom: 6px;
  .text-block {
    display: inline-block;
    font-size: 12px;
    padding: 3px 5px;
    margin-left: 6px;
    &.user-block {
      background-color: lightgrey;
    }
  }
`;
