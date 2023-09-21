import Sidebar from "components/layout/Sidebar";
import React from "react";
import styled from "styled-components";
import { Route, Routes, Navigate } from "react-router-dom";
import Curriculum from "pages/wiki/Curriculum";
import WikiDetail from "./WikiDetail";
import WikiEdit from "./WikiEdit";
//import WikiTime from "pages/wiki/WikiTime";
import WikiTimeRank from "pages/wiki/WikiTimeRank";
import { IsMobile } from "utils/mediaQuery";
const Wiki = () => {
  let leftMargin = 200
  let topMargin = 60
  if(IsMobile()){
    leftMargin = 0
    topMargin = 100
  }

  return (
    <>
      <Sidebar />
      <Container leftmargin={leftMargin} topmargin={topMargin}>
        <Routes>
          {/* 리다이렉션 */}
          <Route path="/" element={<Navigate to="/Wiki/출석" />} />
          {/* 디테일 페이지 */}
          <Route path="/:page" element={<WikiDetail />}></Route>
          {/* 수정 페이지 */}
          <Route path="/:page/edit" element={<WikiEdit />}></Route>
          {/* 금주의 학습 일정 */}
          <Route path="학습 일정" element={<Curriculum />}></Route>
          {/* 학습시간 등급 */}
          {/* <Route path="학습시간 등급" element={<WikiTime />}></Route> */}
          {/* 학습 시간왕 */}
          <Route path="학습 시간왕" element={<WikiTimeRank />}></Route>
        </Routes>
      </Container>
    </>
  );
};

const Container = styled.section<IContainer>`
  position: relative;
  left: ${props=>props.leftmargin}px;
  height: calc(100% - ${props=>props.topmargin}px);
  width: calc(100% - ${props=>props.leftmargin}px);
  padding: 5px;
  box-sizing: border-box;
`;

interface IContainer {
  leftmargin : number;
  topmargin : number;
}

export default Wiki;
