import React from "react";
import { CalendarOutlined } from "@ant-design/icons";
import styled from "styled-components";

const ProjectDate = ({ duration }: { duration?: string[] }) => {
  return (
    <ProjectDateInfo>
      <CalendarOutlined />
      <span className="text-block date-block">{duration?.join(" ~ ")}</span>
    </ProjectDateInfo>
  );
};

export default ProjectDate;

const ProjectDateInfo = styled.div`
  margin-bottom: 6px;
  .text-block {
    display: inline-block;
    font-size: 12px;
    padding: 3px 5px;
    margin-left: 6px;
    &.date-block {
      background-color: lightpink;
    }
  }
`;
