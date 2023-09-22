import React from "react";
import styled from "styled-components";

const ProjectDetailDefault = () => {
  return (
    <ProjectDetailHolder>
      <div>
        <object data={process.env.PUBLIC_URL + "/wiki.svg"}></object>
        <p>
          왼쪽에 프로젝트 목록을 클릭 해주시면 <br />
          상세정보가 이곳에 보여집니다.
        </p>
      </div>
    </ProjectDetailHolder>
  );
};

export default ProjectDetailDefault;

const ProjectDetailHolder = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  object {
    display: block;
    max-width: 320px;
    margin: 0 auto;
  }
  p {
    text-align: center;
  }
`;
