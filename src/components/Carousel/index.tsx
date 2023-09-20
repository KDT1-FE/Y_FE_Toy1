import React from 'react';
import Slider from 'react-slick';
import { media } from 'styles/media';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Carousel() {
  const carouselImages = [
    {
      title1: '삼성 강남과 함께하는',
      title2: '패캠 원데이 클래스',
      src: '../images/2.png',
    },
    {
      title1: '하반기 공채 지원?',
      title2: '합격 비결은 공채 패키지',
      src: '../images/3.png',
    },
    {
      title1: '이번 주엔 누구나 1+1',
      title2: '쿠폰 100% 당첨',
      src: '../images/1.png',
    },
    {
      title1: '백엔드 개발자라면?',
      title2: '핀테크 개발은 못참지',
      src: '../images/4.png',
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
    initialSlide: 1,
  };

  return (
    <StyledWrapper>
      <StyledCarousel {...settings}>
        {carouselImages.map((item, index) => (
          <StyledItem key={index}>
            <StyledImg>
              <StyledTitle1>{item.title1}</StyledTitle1>
              <StyledTitle2>{item.title2}</StyledTitle2>
              <img
                src={item.src}
                alt="carousel Image"
                width={1600}
                height={420}
              />
            </StyledImg>
          </StyledItem>
        ))}
      </StyledCarousel>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`;

const StyledCarousel = styled(Slider)`
  .slick-list {
    width: 100%;
    margin: 0 auto;
    max-width: 100%;
  }
  .slick-slide div {
    cursor: pointer;
  }
  .slick-dots {
    bottom: -2.2rem;
  }
  .slick-dots li button:before {
    color: blue;
  }
  ${media.tablet(`
    .slick-slide div{
      max-width: 100%
    }
  `)}
`;

const StyledItem = styled.div`
  position: relative;
  border-radius: 24px;
  background: none;
  box-shadow: 0px 3px 7px 5px rgba(0, 0, 0, 0.1);
`;

const StyledImg = styled.div`
  width: auto;
  height: auto;
  position: relative;
  object-fit: cover;

  border-radius: 26px;
  overflow: hidden;

  img {
    max-width: 100%;
    height: auto;
  }
`;

const StyledTitle1 = styled.span`
  position: absolute;
  top: 0;
  padding: 3rem;

  font-size: 2.25rem;
  font-weight: 600;
  color: white;

  ${media.tablet(`
  font-size: 1rem
`)}
`;

const StyledTitle2 = styled.span`
  position: absolute;
  top: 0;
  padding: 7rem 3rem 0rem 3rem;

  font-size: 2.25rem;
  font-weight: 600;
  color: white;

  ${media.tablet(`
  padding: 4.8rem 3.4rem;
  font-size: .4rem
`)}
`;

export default Carousel;
