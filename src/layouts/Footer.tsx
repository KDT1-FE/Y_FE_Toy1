import React from "react";
import "../styles/Footer.css";
import { Layout } from "antd";
import { Link } from "react-router-dom";

const { Footer } = Layout;

const MainFooter = () => {
  return (
    <Footer>
      <h1 className="footer-logo fe3-wiki-logo">
        <a href="/">Logo</a>
      </h1>
      <div className="footer-infos">
        이정도면껌이조 | 팀장: 박나영, 팀원: 김미정, 김성겸, 노욱진, 진종수 |
        패스트캠퍼스 X 야놀자 프론트엔드 부트캠프 토이프로젝트
      </div>
      <div className="footer-infos">
        fe3.wiki@gmail.com | &copy; {new Date().getFullYear()} fe3.wiki{" "}
      </div>
      <div className="footer-infos">
        <Link to={"/"}>서비스 이용약관</Link>
        {" | "}
        <Link to={"/"}>개인정보 처리방침</Link>
      </div>
    </Footer>
  );
};

export default MainFooter;
