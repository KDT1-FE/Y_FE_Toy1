import React from "react";
import { Link, useLocation,useParams } from "react-router-dom";
import styled from "styled-components";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();
  const hashSplit = location.pathname.split("/");
  console.log(useParams())
  if (hashSplit[1] === "Wiki") {
    const sideLinkAttendance = ["출석 인정", "QR출결 정정 프로세스"];
    const sideLinkAdmin = ["휴가", "훈련장려금"];

    // Wiki 사이드바
    return (
      <Container>
        <ul className="sidebar__link-wrapper">
          <li key={"출석"}>
            <Link to={`/Wiki/`}><p className="title-text">출석</p></Link>
          </li>
          {sideLinkAttendance.map((link, idx) => (
            <li key={sideLinkAttendance[idx]}>
              <Link to={`/Wiki/${link}`}><p className="normal-text">{link}</p></Link>
            </li>
          ))}
          <li key={"행정"}><p className="title-text">행정</p></li>
          {sideLinkAdmin.map((link, idx) => (
            <li key={sideLinkAdmin[idx]}>
              <Link to={`/Wiki/${link}`}> <p className="normal-text">{link}</p> </Link>
            </li>
          ))}
          <li key={"학습 일정"}>
            <Link to={`/Wiki/학습 일정`}><p className="title-text">금주의 학습 일정</p></Link>
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
  width: 200px;
  height: 100%;
  box-sizing: border-box;
  padding: 10px;
  .active{
    color: var(--main-color);
  }
  .title-text{
    margin: 0;
    padding-top: 20px;
    font-size: 18px;
  }
  .normal-text{
    margin: 0;
    font-size: 16px;
    color: #777;
  }
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
