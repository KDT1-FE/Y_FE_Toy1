import * as style from "./FooterStyle";

export default function Footer() {
  return (
    <style.FooterWrap>
      <style.FooterTop>
        <style.FooterTopLeft>
          <span>9굴 WIKI</span>
        </style.FooterTopLeft>
        <style.FooterTopMid>
          <a href="https://github.com/jseo9732">
            <p>서지수</p>{" "}
          </a>
          <a href="https://github.com/ewinkite">
            <p>이승연</p>{" "}
          </a>
          <a href="https://github.com/KSJT">
            <p>김소정</p>{" "}
          </a>
          <a href="https://github.com/yangjaejun">
            <p>양재준</p>{" "}
          </a>
          <a href="https://github.com/2YH02">
            <p>이용훈</p>{" "}
          </a>
        </style.FooterTopMid>
        <style.FooterTopRight>
          <a href="https://github.com/toy-1/wiki">
            <img src="../../../public/images/github-logo.png" />
          </a>
        </style.FooterTopRight>
      </style.FooterTop>
      {/* <style.FooterBottom>4</style.FooterBottom> */}
    </style.FooterWrap>
  );
}
