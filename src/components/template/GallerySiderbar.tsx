import React, { useState } from "react";
import styled from "styled-components";
import SidebarBottom from "components/layout/SidebarBottom";
import { IsMobile } from "utils/mediaQuery"

interface GalleryProps {
  handleClick: (category: string) => void;
  activeCategory: string;
}

const GallerySidebar: React.FC<GalleryProps> = ({
  handleClick,
  activeCategory,
}) => {
  const [displaySidebar, setDisplaySidebar] = useState(false);
  // 모바일 갤러리 사이드바
  if(IsMobile()){
    return(
    <MobileContainer>
      {/*Inner Container 부분이 움직입니다, MobileContainer 부분은 움직이지 않고, 모바일 사이드바 렌더링 시 나타납니다 */}
      <MobileInnerContainer displaysidebar={displaySidebar?"true":"false"}>
        <div className="header__mobile-close-wrap" onClick={()=>{setDisplaySidebar(false)}}>
          <img src={process.env.PUBLIC_URL+'/svg/icon_close.svg'} alt="닫기 버튼" />    
        </div>
        <ListItem
          className={activeCategory === "all" ? "active" : ""}
          onClick={() => {
            handleClick("all")
            setDisplaySidebar(false)
          }}
        > 전체보기
        </ListItem>
        <ListItem
            className={activeCategory === "notice" ? "active" : ""}
            onClick={() => {
              handleClick("notice")
              setDisplaySidebar(false)
            }}
          >
            공지사항
          </ListItem>
          <ListItem
            className={activeCategory === "news" ? "active" : ""}
            onClick={() => {
              handleClick("news")
              setDisplaySidebar(false)
            }}
          >
            모집공고
          </ListItem>
          <ListItem
            className={activeCategory === "random" ? "active" : ""}
            onClick={() => {
              handleClick("random")
              setDisplaySidebar(false)
            }}
          >
            랜덤토크
          </ListItem>
      </MobileInnerContainer>
      <div className="sidebar__openSidebar-icon" onClick={()=>setDisplaySidebar(prev=>!prev)} >
        <img src={process.env.PUBLIC_URL+'/svg/icon_list.svg'} alt="사이드바 열기 버튼" />
      </div>
    </MobileContainer>
    )
  }else{
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
  }
};

const MobileContainer = styled.div`
  .sidebar__openSidebar-icon{
    z-index:13;
    position: fixed;
    right: 20px;
    bottom: 20px;
    width: 50px;
    height: 50px;
    background-color:var(--main-color);
    cursor:pointer;
    border-radius: 50%;
    box-sizing:border-box;
    display:flex;
    align-items: center;
    justify-content: center;
    img{
      width: 25px;
      height: 25px;
    }
  }
`

interface IMobileInnerContainer {
  displaysidebar: string;
}
const MobileInnerContainer = styled.div<IMobileInnerContainer>`
  position:absolute;
  height: 100%;
  width: 100%;
  z-index: 15;
  background-color: #fff;
  left:${props=>props.displaysidebar==="true"? '0px;' : '-100%;'}
  transition: all 1s ease-in-out;

  .header__mobile-close-wrap{
    position: absolute;
    top: 10px;
    right: 15px;
    cursor:pointer;
    img{
      width: 40px;
      height: 40px;
    }
  }
`

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
