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
        <ul className="sidebar__link-wrapper">
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
        <SidebarBottom />
      </Container>
    );

    // Gallery 사이드바
  } else if (hashSplit[1] === "Gallery") {
    return (
      <Container>
        <ul className="sidebar__link-wrapper">
          <li>갤러리글 1</li>
          <li>갤러리글 2</li>
          <li>갤러리글 3</li>
        </ul>
        <SidebarBottom />
      </Container>
    );
  }
};

const Container = styled.aside`
  position: fixed;
  z-index: 9;
  width: 140px;
  height: 100%;
  background-color: #ddd;
`;

function SidebarBottom(): JSX.Element {
  return (
    <>
      <div className="sidebar__bottom">
        <hr className="sidebar__bottom-hr" />
        <a href="https://app.slack.com/client/T057XJP4T34/C05FRTBDHDL">
          <img
            className="sidebar__bottom_QRcode"
            src={process.env.PUBLIC_URL + "/svg/AttendanceQR.svg"}
            alt="QR코드"
          />
        </a>
        <div className="sidebar__bottom_icon">
          <a href="https://www.notion.so/X-24f85bf2ff4e4c69bd45ddc4e05d464b">
            <img
              src={process.env.PUBLIC_URL + "/svg/icon-notion.svg"}
              alt="notion"
            />
          </a>
          <a href="https://docs.google.com/spreadsheets/d/1Ffg--2TCzecwLMODoBHrTAk7zWufPLrJoyLVCwE4ea4/edit#gid=1823006152">
            <img
              src={process.env.PUBLIC_URL + "/svg/icon-sheet.svg"}
              alt="sheet"
            />
          </a>
          <a href="https://us06web.zoom.us/j/4912611157?pwd=N2swc3kxRG9uYTFKa2lBTUI2dS9NZz09#success">
            <img
              src={process.env.PUBLIC_URL + "/svg/icon-zoom.svg"}
              alt="zoom"
            />
          </a>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
