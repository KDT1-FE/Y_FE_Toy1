import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const hashSplit = location.pathname.split("/");

  if (hashSplit[1] === "Wiki") {
    //const sideLink = ["", "행정", "학습일정"]
    const sideName = ["출석", "행정", "학습일정"];
    const sideLinkAttendance = ["출석 인정", "QR출결 정정 프로세스"];
    const sideLinkAdmin = ["휴가", "훈련장려금"];

    // Wiki 사이드바
    return (
      <Container>
        <ul className="sidebar__link_wrapper">
          <li key={"출석"}>
            <Link to={`/Wiki/`}>출석</Link>
          </li>
          {sideLinkAttendance.map((link, idx) => (
            <li key={sideLinkAttendance[idx]}>
              <Link to={`/Wiki/${link}`}>{link}</Link>
            </li>
          ))}
          <li key={"행정"}>행정</li>
          {sideLinkAdmin.map((link, idx) => (
            <li key={sideLinkAdmin[idx]}>
              <Link to={`/Wiki/${link}`}> {link} </Link>
            </li>
          ))}
          <li key={"학습 일정"}>
            <Link to={`/Wiki/학습 일정`}>금주의 학습 일정</Link>
          </li>
        </ul>
      </Container>
    );

    // Gallery 사이드바
  } else if (hashSplit[1] === "Gallery") {
    return <Container>Gallery Sidebar</Container>;
  }
};

const Container = styled.aside`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 9;
  width: 140px;
  height: 100%;
  background-color: #ddd;
`;

export default Sidebar;
