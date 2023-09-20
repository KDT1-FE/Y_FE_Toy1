import React from "react";
import styled from "styled-components";
import Comment from "../components/Comment";

const WikiTimeRank = () => {
  return (
    <>
      <h1>학습 시간 순위 </h1>
      <Container>
        <div>WikiTimeRank Banner</div>
      </Container>
      <Comment />
    </>
  );
};

const Container = styled.div`
  height: 300px;
  width: 100%;
  margin: 30px;
  background-color: pink;
`;

export default WikiTimeRank;
