import React, { useState } from "react";
import styled from "styled-components";
import "./Sidebar.css";

interface GalleryProps {
  handleClick: (category: string) => void;
  activeCategory: string; 
}

const GallerySidebar: React.FC<GalleryProps> = ({handleClick, activeCategory}) => {
    return (
      <Container>
        <SidebarList>
          <ListItem className={activeCategory === "notice" ? "active" : ""} onClick={() => handleClick("notice")}>
            공지사항
          </ListItem>
          <ListItem className={activeCategory === "news" ? "active" : ""} onClick={() => handleClick("news")}>
            모집공고
          </ListItem>
          <ListItem className={activeCategory === "random" ? "active" : ""} onClick={() => handleClick("random")}>
            랜덤토크
          </ListItem>
        </SidebarList>
        <SidebarBottom />
      </Container>
    );
};

const SidebarList = styled.ul`
  height: calc(100vh - 300px);
  min-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-top: 30px;
`;

const SidebarBottomBox = styled.div`
  bottom: 0;
  text-align: center;
`;

const Container = styled.aside`
  position: fixed;
  z-index: 9;
  width: 200px;
  height: 100%;
  border-right: 3px solid #ddd;

  .sidebar__bottom {
    bottom: 0;
    text-align: center;
  }

  .sidebar__menu {
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    /* identical to box height, or 30px */
    color: #000000;
  }


`;

const ListItem = styled.li`
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    color: inherit;
    cursor: pointer;
    transition: color 0.3s;
    &:hover,
    &.active{
      color: var(--main-color);
    }
`

const SidebarBottom = (): JSX.Element => {
  return (
    <SidebarBottomBox>
      <hr />
      <a
        href="https://app.slack.com/client/T057XJP4T34/C05FRTBDHDL"
        target="_blank"
        rel="noreferrer"
      >
        <img
          src={process.env.PUBLIC_URL + "/svg/AttendanceQR.svg"}
          alt="QR코드"
        />
      </a>
      <div>
        <a
          href="https://www.notion.so/X-24f85bf2ff4e4c69bd45ddc4e05d464b"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/svg/notion_icon.svg"}
            alt="notion"
          />
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1Ffg--2TCzecwLMODoBHrTAk7zWufPLrJoyLVCwE4ea4/edit#gid=1823006152"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={process.env.PUBLIC_URL + "/svg/sheet_icon.svg"}
            alt="sheet"
          />
        </a>
        <a
          href="https://us06web.zoom.us/j/4912611157?pwd=N2swc3kxRG9uYTFKa2lBTUI2dS9NZz09#success"
          target="_blank"
          rel="noreferrer"
        >
          <img src={process.env.PUBLIC_URL + "/svg/zoom_icon.svg"} alt="zoom" />
        </a>
      </div>
    </SidebarBottomBox>
  );
};

export default GallerySidebar;
