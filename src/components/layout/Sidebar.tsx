import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarBottom from "./SidebarBottom";
import { IsMobile } from "utils/mediaQuery"

const Sidebar = () => {
  const location = useLocation();
  const hashSplit = location.pathname.split("/");

  // active 관리
  const [activeItem, setActiveItem] = useState("");

  if (hashSplit[1] === "Wiki") {
    const sideLinkAttendance = ["출석 인정", "QR출결 정정 "];
    const sideLinkAdmin = ["휴가", "훈련장려금"];

    // 클릭시 항목 상태 업데이트
    const handleItemClick = (item: string) => {
      setActiveItem(item);
    };
    // Wiki 사이드바
    return (
      <Container>
        <SidebarList>
          <li key={"출석"} className={"sidebar__menu"}>
            <Link to="출석" onClick={() => handleItemClick("출석")}>
              출석
            </Link>
          </li>
          {sideLinkAttendance.map((page, idx) => {
            return (
              <li className={`sidebar__item ${activeItem === page ? "active" : ""}`} key={sideLinkAttendance[idx]}>
                <Link to={`${page}`} onClick={() => handleItemClick(page)}>
                  {page}
                </Link>
              </li>
            );
          })}
          <li key={"행정"} className="sidebar__menu">
            행정
          </li>
          {sideLinkAdmin.map((page, idx) => {
            return (
              <li className={`sidebar__item ${activeItem === page ? "active" : ""}`} key={sideLinkAdmin[idx]}>
                <Link to={`${page}`} onClick={() => handleItemClick(page)}>
                  {page}
                </Link>
              </li>
            );
          })}
          <li key={"학습시간 등급"} className="sidebar__menu">
            <Link
              to="학습시간 등급"
              onClick={() => handleItemClick("학습시간 등급 안내")}
            >
              학습시간 등급 안내
            </Link>
          </li>
          <li key={"학습 시간왕"} className="sidebar__menu">
            <Link
              to="학습 시간왕"
              onClick={() => handleItemClick("학습 시간왕")}
            >
              학습 시간왕
            </Link>
          </li>
          <li key={"학습 일정"} className="sidebar__menu">
            <Link to="학습 일정" onClick={() => handleItemClick("금주의 학습 일정")}>
              금주의 학습 일정
            </Link>
          </li>
        </SidebarList>
        <SidebarBottom />
      </Container>
    );

    // Gallery 사이드바
  } else if (hashSplit[1] === "Gallery") {
    return (
      <Container>
        <SidebarList>
          <li>갤러리글 1</li>
          <li>갤러리글 2</li>
          <li>갤러리글 3</li>
        </SidebarList>
        <SidebarBottom />
      </Container>
    );
  } else if (hashSplit[1] === "Rank") {
    return (
      <Container>
        <SidebarList>
          <li>리더보드</li>
        </SidebarList>
        <SidebarBottom />
      </Container>
    );
  }
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

    color: #000000;
  }

  .sidebar__item a {
    color: #7a7c85;
    font-weight: 300;
    font-size: 18px;
    line-height: 148%;
  }

  .sidebar__item.active a {
    color: var(--main-color);
    font-weight: 300;
    font-size: 18px;
    line-height: 148%;
  }
`;

/* 토글버튼
<li key={"행정"} onClick={()=>setDisplayToggle(prev=>!prev)}><p style={{cursor:'pointer'}} className="sidebar__title-text">{displayToggle?'▼ ':'▶ ' }행정</p></li>
{displayToggle && <ul className="sidebar__toggle">
  {sideLinkAdmin.map((link, idx) => (
  <li key={sideLinkAdmin[idx]}>
    <Link to={`/Wiki/${link}`}> <p className="sidebar__normal-text">{link}</p> </Link>
  </li>))}
</ul>}
*/
export default Sidebar;
