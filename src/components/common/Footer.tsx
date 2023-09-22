import { useLocation } from "react-router-dom";
import * as style from "./FooterStyle";

export default function Footer() {
  const location = useLocation();
  if (location.pathname === "/login") return null;
  return (
    <style.FooterWrap>
      <style.FooterTop>
        <style.FooterTopLeft>
          <span>9굴 WIKI</span>
        </style.FooterTopLeft>
        <style.FooterTopMid>
          <a href="https://github.com/jseo9732" target="_blank">
            <p>서지수</p>{" "}
          </a>
          <a href="https://github.com/ewinkite" target="_blank">
            <p>이승연</p>{" "}
          </a>
          <a href="https://github.com/KSJT" target="_blank">
            <p>김소정</p>{" "}
          </a>
          <a href="https://github.com/yangjaejun" target="_blank">
            <p>양재준</p>{" "}
          </a>
          <a href="https://github.com/2YH02" target="_blank">
            <p>이용훈</p>{" "}
          </a>
        </style.FooterTopMid>
        <style.FooterTopRight>
          <a href="https://github.com/toy-1/wiki" target="_blank">
            <img src="/images/github-logo.png" />
          </a>
        </style.FooterTopRight>
      </style.FooterTop>
      {/* <style.FooterBottom>4</style.FooterBottom> */}
    </style.FooterWrap>
  );
}
