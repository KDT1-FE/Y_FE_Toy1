import * as style from "./FooterStyle";

export default function Footer() {
  return (
    <style.FooterWrap>
      <style.FooterTop>
        <style.FooterTopLeft>
          <span>9굴</span>
          <span>WIKI</span>
        </style.FooterTopLeft>
        <style.FooterTopMid>
          <p>서지수</p>
          <p>이승연</p>
          <p>김소정</p>
          <p>양재준</p>
          <p>이용훈</p>
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
