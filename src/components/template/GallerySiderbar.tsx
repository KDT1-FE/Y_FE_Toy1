import React, { useState } from "react";
import styled from "styled-components";
import SidebarBottom from "components/layout/SidebarBottom";

interface GalleryProps {
  handleClick: (category: string) => void;
  activeCategory: string;
}

const GallerySidebar: React.FC<GalleryProps> = ({
  handleClick,
  activeCategory,
}) => {
  return (
    <Container>
      <SidebarList>
        <ListItem
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => handleClick("all")}
        > 전체보기
        </ListItem>
        <ListItem
          className={activeCategory === "notice" ? "active" : ""}
          onClick={() => handleClick("notice")}
        >
          공지사항
        </ListItem>
        <ListItem
          className={activeCategory === "news" ? "active" : ""}
          onClick={() => handleClick("news")}
        >
          모집공고
        </ListItem>
        <ListItem
          className={activeCategory === "random" ? "active" : ""}
          onClick={() => handleClick("random")}
        >
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

  .svg_icon {
    margin: 5px;
  }

  .sidebar__menu {
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
    /* identical to box height, or 30px */
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
  &.active {
    color: var(--main-color);
  }
`;

export default GallerySidebar;
