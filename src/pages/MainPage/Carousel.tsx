/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import getNoticeData from '../../utils/NoticePage/getNoticesData';
import * as S from '../../styled/MainPage/Carousel.styles';

// 화살표 함수
const Arrow = ({ onClick, direction }: any) => (
  <S.ArrowButton type='button' direction={direction} onClick={onClick}>
    <ExpandCircleDownIcon />
  </S.ArrowButton>
);

function Carousel() {
  const [noticeList, setNoticeList] = useState<DocumentData[] | undefined>([]);
  const navigate = useNavigate();

  // 공지사항 전체 가져오기
  const getNoticeList = async (): Promise<void> => {
    try {
      const dataList = await getNoticeData();
      setNoticeList(dataList?.slice(dataList.length - 3));
    } catch (error) {
      console.log('Error: ', error);
    }
  };

  // react-slick 셋팅
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    nextArrow: <Arrow direction='next' />,
    prevArrow: <Arrow direction='prev' />
  };

  useEffect(() => {
    getNoticeList();
  }, []);

  return (
    <S.SliderWrapper>
      <S.StyledSlider {...settings}>
        {noticeList?.map((notice, index) => (
          <S.Slide key={index} onClick={() => navigate(`/notice/${notice.noticeNumber}`)}>
            <S.SlideImage src={notice.imageUrl} alt={notice.imageUrl} />
          </S.Slide>
        ))}
      </S.StyledSlider>
    </S.SliderWrapper>
  );
}

export default Carousel;
