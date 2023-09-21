import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

const Carousel: React.FC = () => {
  const settings: settingsType = {
    dots: true, // 개수 표시 점
    infinite: true, // 무한 캐러셀
    speed: 500, // 다음 컨텐츠 까지의 속도
    slidesToShow: 1, // 화면에 보이는 컨텐츠 수
    slidesToScroll: 1, // 스크롤 시 넘어가는 컨텐츠 수
    centerMode: true, // 현재 컨텐츠 가운데 정렬
    centerPadding: "0px", // 중앙 컨텐츠 padding 값
    autoplay: true, // 자동 캐러셀
    autoplaySpeed: 2000, // 자동 캐러셀 속도
    draggable: true, // 드래그
    fade: false, // 사라졌다 나타나는 효과
    arrows: false, // 좌,우 버튼
    vertical: false, // 세로 캐러셀
    initialSlide: 0, // 첫 컨텐츠 번호
    pauseOnFocus: true, // focus시 정지
    pauseOnHover: true, // hover시 정지
    responsive: [
      // 반응형 옵션
      {
        breakpoint: 480, // (숫자)px 이하일 경우
        settings: {
          slidesToShow: 1,
          arrows: true,
        },
      },
    ],
  };
  return (
    <Container>
      <Slider {...settings}>
        <a href="https://kdt.fastcampus.co.kr/account/sign-in" target="_blank" rel="noreferrer">
          <img src={process.env.PUBLIC_URL + "/svg/banner/fastcampus_banner.svg"} alt="fastcampus_banner" />
        </a>
        <a href="https://www.notion.so/X-24f85bf2ff4e4c69bd45ddc4e05d464b" target="_blank" rel="noreferrer">
          <img src={process.env.PUBLIC_URL + "/svg/banner/notion_banner.svg"} alt="notion_banner" />
        </a>
        <a href="https://app.slack.com/client/T057XJP4T34/threads" target="_blank" rel="noreferrer">
          <img src={process.env.PUBLIC_URL + "/svg/banner/slack_banner.svg"} alt="slack_banner" />
        </a>
        <a
          href="https://us06web.zoom.us/j/4912611157?pwd=N2swc3kxRG9uYTFKa2lBTUI2dS9NZz09#success"
          target="_blank"
          rel="noreferrer"
        >
          <img src={process.env.PUBLIC_URL + "/svg/banner/zoom_banner.svg"} alt="zoom_banner" />
        </a>
        <a
          href="https://docs.google.com/spreadsheets/d/1Ffg--2TCzecwLMODoBHrTAk7zWufPLrJoyLVCwE4ea4/edit#gid=831646039"
          target="_blank"
          rel="noreferrer"
        >
          <img src={process.env.PUBLIC_URL + "/svg/banner/sheet_banner.svg"} alt="sheet_banner" />
        </a>
      </Slider>
    </Container>
  );
};

type settingsType = {
  dots: boolean;
  infinite: boolean;
  speed: number;
  slidesToShow: number;
  slidesToScroll: number;
  centerMode: boolean;
  centerPadding: string;
  autoplay: boolean;
  autoplaySpeed: number;
  draggable: boolean;
  fade: boolean;
  arrows: boolean;
  vertical: boolean;
  initialSlide: number;
  pauseOnFocus: boolean;
  pauseOnHover: boolean;
  responsive: Array<{
    breakpoint: number;
    settings: {
      slidesToShow: number;
      arrows: boolean;
    };
  }>;
};

const Container = styled.div`
  margin-bottom: 50px;
`;

export default Carousel;
