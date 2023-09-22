import React from "react";
// import Swiper JS
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { MAIN_SLIDES, slideInfos } from "../../constant/main";
import styled from "styled-components";

const MainSwiper = () => {
  return (
    <section style={{ margin: "0 -24px" }}>
      <Swiper
        loop={true}
        loopedSlides={1}
        className="main-swiper"
        modules={[Navigation]}
        navigation
        slidesPerView={"auto"}
        centeredSlides={true}
      >
        {MAIN_SLIDES.map((slide) => (
          <SwiperSlide key={slide.key}>
            <MainSwiperItem $slide={slide}>
              <div className="slide-wrap">
                <div
                  className="slide-desc"
                  style={{
                    paddingRight: "50px",
                  }}
                >
                  <h3 className="text-block">{slide.subText}</h3>
                  <h2>{slide.title}</h2>
                  <p>{slide.description}</p>
                </div>
                <div className="slide-bg"></div>
              </div>
            </MainSwiperItem>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default MainSwiper;

const MainSwiperItem = styled.div<{ $slide: slideInfos }>`
  padding: 0 8px;
  .slide-wrap {
    display: flex;
    height: 375px;
    border-radius: 10px;
    padding: 10px;
    overflow: hidden;
    background-color: ${(props) => props.$slide.bgColor};
    .slide-desc,
    .slide-bg {
      width: 50%;
      box-sizing: border-box;
    }
    .slide-desc {
      padding-left: 60px;
      padding-top: 80px;
      .text-block {
        display: inline-block;
        font-size: 14px;
        border-radius: 5px;
        padding: 5px 8px;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .slide-bg {
      background-image: url(${(props) => props.$slide.background});
      background-repeat: no-repeat;
      background-position: 50% 50%;
      background-size: cover;
      border-radius: 5px;
      .origin {
        font-size: 12px;
        padding: 10px;
        display: block;
        color: #999;
        a {
          color: inherit;
        }
      }
    }
    h2,
    h3,
    p {
      color: #fff;
    }
  }
`;
