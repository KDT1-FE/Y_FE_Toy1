import Sidebar from "components/Sidebar";
import React from "react";
import styled from "styled-components";
import { Route, Routes, Navigate } from "react-router-dom";
import Curriculum from "../components/Curriculum";
import WikiDetail from "./WikiDetail";
import WikiEdit from "./WikiEdit";

const Wiki = () => {
  return (
    <>
      <Sidebar />
      <Container>
        <Routes>
          {/* 리다이렉션 */}
          <Route path="/" element={<Navigate to="/Wiki/출석" />} />
          {/* 디테일 페이지 */}
          <Route path="/:page" element={<WikiDetail />}></Route>
          {/* 수정 페이지 */}
          <Route path="/:page/edit" element={<WikiEdit />}></Route>
          {/* 금주의 학습 일정 */}
          <Route path="학습 일정" element={<Curriculum />}></Route>
        </Routes>
      </Container>
    </>
  );
};

const Container = styled.section`
  position: relative;
  left: 180px;
  height: calc(100% - 60px);
  width: calc(100% - 180px);
  padding: 5px;
  box-sizing: border-box;
`;

export default Wiki;
