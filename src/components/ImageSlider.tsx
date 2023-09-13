// import React from 'react';
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import 'swiper/swiper-bundle.min.css'; 


// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

// import study1Image from '../images/study1.jpeg'; // 이미지 파일 경로
// import study2Image from '../images/study2.avif'; // 이미지 파일 경로
// import 'swiper/swiper-bundle.min.css'; // Swiper CSS 파일

// SwiperCore.use([Autoplay, Pagination, Navigation]);

// function ImageSlider() {
//   const params = {
//     spaceBetween: 30, // 슬라이드 사이 간격
//     slidesPerView: 1, // 한 번에 보여질 슬라이드 수
//     loop: true, // 무한 루프
//     autoplay: {
//       delay: 3000, // 자동 재생 간격 (ms)
//       disableOnInteraction: false, // 스와이프 후에도 자동 재생 유지
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     }, // 네비게이션 버튼 (이전/다음)
//     pagination: {
//       el: '.swiper-pagination', // pagination 컨테이너를 나타내는 CSS 선택자
//       clickable: true, // 페이지 버튼을 클릭 가능하게 설정
//     },
//   };

//   return (
//     <div className="swiper-container">
//     <Swiper {...params}>
//       <SwiperSlide>
//         <img src={study1Image} alt="Slide 1" />
//       </SwiperSlide>
//       <SwiperSlide>
//         <img src={study2Image} alt="Slide 2" />
//       </SwiperSlide>
//       {/* 추가 슬라이드들 */}
//     </Swiper>
//     </div>
//   );
// }

// export default ImageSlider;


// import React, { useEffect } from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import SwiperCore, { Autoplay, Pagination, Navigation } from 'swiper';

// import 'swiper/swiper-bundle.min.css';

// import study1Image from '../images/study1.jpeg'; // 이미지 파일 경로
// import study2Image from '../images/study2.avif'; // 이미지 파일 경로

// const ImageSlider = () => {
//   useEffect(() => {
//     // Swiper 모듈 초기화
//     SwiperCore.use([Autoplay, Pagination, Navigation]);
//   }, []);

//   const params = {
//     spaceBetween: 30, // 슬라이드 사이 간격
//     slidesPerView: 1, // 한 번에 보여질 슬라이드 수
//     loop: true, // 무한 루프
//     autoplay: {
//       delay: 3000, // 자동 재생 간격 (ms)
//       disableOnInteraction: false, // 스와이프 후에도 자동 재생 유지
//     },
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     }, // 네비게이션 버튼 (이전/다음)
//     pagination: {
//       el: '.swiper-pagination', // pagination 컨테이너를 나타내는 CSS 선택자
//       clickable: true, // 페이지 버튼을 클릭 가능하게 설정
//     },
//   };

//   return (
//     <div className="swiper-container">
//       <Swiper {...params}>
//         <SwiperSlide>
//           <img src={study1Image} alt="Slide 1" />
//         </SwiperSlide>
//         <SwiperSlide>
//           <img src={study2Image} alt="Slide 2" />
//         </SwiperSlide>
//         {/* 추가 슬라이드들 */}
//       </Swiper>
//     </div>
//   );
// };

// export default ImageSlider;


// import React from 'react';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/swiper-bundle.min.css';
// import "swiper/swiper.min.css";
// import "swiper/components/navigation/navigation.min.css";
// import "swiper/components/pagination/pagination.min.css";
// import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';

// Swiper 모듈 초기화
// SwiperCore.use([Navigation, Pagination, Autoplay]);

// const ImageSlider = () => {
//   const images = [
//     '../images/study1.jpeg',
//     '../images/study2.avif',
//     // 추가 이미지 경로 추가
//   ];

//   return (
//     <Swiper
//       navigation={true}
//       pagination={true}
//       autoplay={{ delay: 3000 }}
//     >
//       {images.map((image, index) => (
//         <SwiperSlide key={index}>
//           <img
//             src={`./images/${image}`} // 이미지 경로를 맞게 수정
//             alt={`Slide ${index + 1}`}
//           />
//         </SwiperSlide>
//       ))}
//     </Swiper>
//   );
// };

// export default ImageSlider;

// import React, { useRef, useState } from "react";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
// import "swiper/css";
// import "swiper/css/effect-fade";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import required modules
// import { Autoplay, EffectFade, Navigation, Pagination } from "swiper";

// export default function SliderContainer() {
//   const items = [
//     { src: "/assets/imgs/good.jpg" },
//     { src: "/assets/imgs/genius.jpg" },
//   ];
//   return (
//     <>
//       <Swiper
//         effect={"fade"}
//         autoplay={{
//           delay: 3000,
//           disableOnInteraction: false,
//         }}
//         pagination={{
//           clickable: true,
//         }}
//         modules= {[Navigation, EffectFade, Pagination, Autoplay]}
//         className="mySwiper"
//         loop={true}
//       >
//         {items.map((item, idx) => {
//           return (
//             <SwiperSlide key={idx}>
//               <img src={item.src} />
//             </SwiperSlide>
//           );
//         })}
//       </Swiper>
//     </>
//   );
// }


import '../styles/Main.css'; 
// import Slick
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import study1Image from '../images/study1.jpeg'; // 이미지 파일 경로
import study2Image from '../images/study2.avif'; // 이미지 파일 경로

const ImageSlider = () => {
    // 옵션
    const settings = {
        dots: true,
        infinite: true,
        speed: 500
    }

    return (
        <div className="carousel">
            <Slider { ...settings }>
                <div>
                    <img src={study1Image} alt="Slide 1" />
                </div>
                <div>
                    <img src={study2Image} alt="Slide 2" />
                </div>
                <div>
                    Slide 3
                </div>
            </Slider>
        </div>
    );
}

export default ImageSlider;