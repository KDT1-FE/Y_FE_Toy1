import Sidebar from "components/Sidebar";
import React from "react";
import styled from "styled-components";
import { Route, Routes } from "react-router-dom";
import Administration from "../components/Admin";
import Curriculum from "../components/Curriculum";
import Attendance from "components/Attendance";
import AttRecognition from "components/AttRecognition";
import AttCorrection from "components/AttCorrection";
import Leave from "components/Leave";
import TrainingIncentive from "components/TrainingIncentive";

const Wiki = () => {
  return (
    <>
      <Sidebar />
      <Container>
        <Routes>
          <Route path="" element={<Attendance />}></Route>
          <Route path="출석 인정" element={<AttRecognition />}></Route>
          <Route
            path="QR출결 정정 프로세스"
            element={<AttCorrection />}
          ></Route>
          <Route path="휴가" element={<Leave />}></Route>
          <Route path="훈련장려금" element={<TrainingIncentive />}></Route>
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
`

export default Wiki;
