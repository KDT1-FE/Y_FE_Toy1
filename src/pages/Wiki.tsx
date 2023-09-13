import React from "react";
import "../styles/Wiki.css";
import {Link} from "react-router-dom";
import Content from "../components/Wiki/Content";

function Wiki() {
  return (
    <div className="WikiWrap">
      <div className="WikiSidebar">
        <span className="WikiCategory">회사생활</span>
        <div className="CategoryListWrapper">
          <Link to="/wiki/회사생활">회사생활</Link>
          <Link to="/wiki/회사내규">회사내규</Link>
          <Link to="/wiki/팀소개">팀 소개</Link>
          <Link to="/wiki/조직도">조직도</Link>
        </div>
        <span className="WikiCategory">프로젝트</span>
        <div className="CategoryListWrapper">
          <Link to="/wiki/진행중인프로젝트">진행중인 프로젝트</Link>
          <Link to="/wiki/완료된프로젝트">완료된 프로젝트</Link>
        </div>
        <span className="WikiCategory">정책</span>
        <div className="CategoryListWrapper">
          <Link to="/wiki/휴가정책">휴가 정책</Link>
          <Link to="/wiki/휴가신청">휴가 신청</Link>
          <Link to="/wiki/복리후생">복리후생</Link>
          <Link to="/wiki/경비규정">경비 규정</Link>
        </div>
      </div>
      <Content />
    </div>
  );
}

export default Wiki;
