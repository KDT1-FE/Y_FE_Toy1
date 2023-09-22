import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import SidebarBottom from "./SidebarBottom";
import { IsMobile } from "utils/mediaQuery";

const Sidebar = () => {
  const location = useLocation();
  const hashSplit = location.pathname.split("/");
  const [displaySidebar, setDisplaySidebar] = useState(false);
  // active 관리
  const [activeItem, setActiveItem] = useState("");

  if (hashSplit[1] === "Wiki") {
    const sideLinkAttendance = ["출석 인정", "QR출결 정정 "];

    const sideLinkAdmin = ["휴가", "훈련장려금"];

    // 클릭시 항목 상태 업데이트
    const handleItemClick = (item: string) => {
      setActiveItem(item);
      setDisplaySidebar(false);
    };

    // Wiki 모바일 사이드바
    if (IsMobile()) {
      return (
        <MobileContainer>
          {/*Inner Container 부분이 움직입니다, MobileContainer 부분은 움직이지 않고, 모바일 사이드바 렌더링 시 나타납니다 */}
          <MobileInnerContainer
            displaysidebar={displaySidebar ? "true" : "false"}
          >
            <div
              className="header__mobile-close-wrap"
              onClick={() => {
                setDisplaySidebar(false);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/svg/icon_close.svg"}
                alt="닫기 버튼"
              />
            </div>

            <SidebarList>
              <li key={"출석"} className={"sidebar__menu"}>
                <Link to="출석" onClick={() => handleItemClick("출석")}>
                  출석
                </Link>
              </li>
              {sideLinkAttendance.map((page, idx) => {
                return (
                  <li
                    className={`sidebar__item ${
                      activeItem === page ? "active" : ""
                    }`}
                    key={sideLinkAttendance[idx]}
                  >
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
                  <li
                    className={`sidebar__item ${
                      activeItem === page ? "active" : ""
                    }`}
                    key={sideLinkAdmin[idx]}
                  >
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
            </SidebarList>
            <SidebarBottom />
          </MobileInnerContainer>
          <div
            className="sidebar__openSidebar-icon"
            onClick={() => setDisplaySidebar((prev) => !prev)}
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/icon_list.svg"}
              alt="사이드바 열기 버튼"
            />
          </div>
        </MobileContainer>
      );
    } else {
      // Wiki 데스크톱 사이드바
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
                <li
                  className={`sidebar__item ${
                    activeItem === page ? "active" : ""
                  }`}
                  key={sideLinkAttendance[idx]}
                >
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
                <li
                  className={`sidebar__item ${
                    activeItem === page ? "active" : ""
                  }`}
                  key={sideLinkAdmin[idx]}
                >
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
          </SidebarList>
          <SidebarBottom />
        </Container>
      );
    }
  } else if (hashSplit[1] === "Rank") {
    if (IsMobile()) {
      return (
        <MobileContainer>
          {/*Inner Container 부분이 움직입니다, MobileContainer 부분은 움직이지 않고, 모바일 사이드바 렌더링 시 나타납니다 */}

          <MobileInnerContainer
            displaysidebar={displaySidebar ? "true" : "false"}
          >
            <div
              className="header__mobile-close-wrap"
              onClick={() => {
                setDisplaySidebar(false);
              }}
            >
              <img
                src={process.env.PUBLIC_URL + "/svg/icon_close.svg"}
                alt="닫기 버튼"
              />
            </div>
            <li className="rank" onClick={() => setDisplaySidebar(false)}>
              리더보드
            </li>
          </MobileInnerContainer>
          <div
            className="sidebar__openSidebar-icon"
            onClick={() => setDisplaySidebar((prev) => !prev)}
          >
            <img
              src={process.env.PUBLIC_URL + "/svg/icon_list.svg"}
              alt="사이드바 열기 버튼"
            />
          </div>
        </MobileContainer>
      );
    } else {
      return (
        <Container>
          <SidebarList>
            <li>리더보드</li>
          </SidebarList>
          <SidebarBottom />
        </Container>
      );
    }
  }
};

const MobileContainer = styled.div`
  & {
    overflow: hidden;
  }
  .sidebar__openSidebar-icon {
    z-index: 13;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background-color: var(--main-color);
    cursor: pointer;
    border-radius: 50%;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 25px;
      height: 25px;
    }
  }

  .sidebar__menu {
    font-weight: 400;
    font-size: 20px;
    line-height: 140%;
  }

  .sidebar__item a {
    font-weight: 300;
    font-size: 22px;
    line-height: 148%;
  }

  &.active a {
    color: var(--main-color);
    font-weight: 300;
    font-size: 18px;
    line-height: 148%;
  }
`;

interface IMobileInnerContainer {
  displaysidebar: string;
}
const MobileInnerContainer = styled.div<IMobileInnerContainer>`
  position: absolute;
  height: 100vh;
  width: 100vw;
  z-index: 15;
  background-color: #fff;
  left: ${(props) => (props.displaysidebar === "true" ? "0px;" : "-100%;")};
  transition: all 1s ease-in-out;

  .header__mobile-close-wrap {
    position: absolute;
    top: 10px;
    right: 15px;
    cursor: pointer;
    img {
      width: 40px;
      height: 40px;
    }
  }

  .rank {
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    margin-top: 30px;
    margin-left: 20px;
    cursor: pointer;
  }
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
`;

const SidebarList = styled.div`
  height: calc(100vh - 300px);
  min-height: 200px;
  overflow-y: auto;
  display: flex;
  flex-flow: column;
  gap: 20px;
  margin-top: 30px;
  margin-left: 20px;

  .sidebar__menu {
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
    /* identical to box height, or 30px */
  }

  .sidebar__item a {
    font-weight: 400;
    font-size: 18px;
    line-height: 148%;
    cursor: pointer;
  }

  .sidebar__item a:hover {
    color: var(--main-color);
  }

  .sidebar__item.active a {
    color: var(--main-color);
    font-weight: 400;
    font-size: 18px;
    line-height: 148%;
  }

  li {
    font-weight: 700;
    font-size: 20px;
    line-height: 140%;
  }
`;

export default Sidebar;
