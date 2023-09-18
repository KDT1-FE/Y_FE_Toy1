import React from "react";
import styled from "styled-components";
import "./Sidebar.css";

interface GalleryProps {
  handleClick: (category: string) => void;
}

const Sidebar: React.FC<GalleryProps> = ({handleClick}) => {
    return (
      <Container>
        <ul className="sidebar__link-wrapper">
          <li onClick={() => handleClick("notice")}>공지사항</li>
          <li onClick={() => handleClick("news")}>모집공고</li>
          <li onClick={() => handleClick("random")}>랜덤토크</li>
        </ul>
        <SidebarBottom />
      </Container>
    );
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
