import React from 'react';
import { CarouselSlide } from './SlideRow';

export function MainSlides(): JSX.Element {
  return (
    <div>
      <div className="inner">
        <div id="studyTips" className="studyTips-title">
          <CarouselSlide
            categoryId="공부꿀팁"
            slideClassName="leftSlideItem"
            cateEmoji="✏"
            slideContent="모두 다같이 힘내서 공부해봅시다~!"
          />
        </div>

        <div id="events" className="events-title">
          <CarouselSlide
            categoryId="이벤트"
            slideClassName="rightSlideItem"
            cateEmoji="✨"
            slideContent="좋은 이벤트 정보를 모두에게 알려주면 어떨까요??"
          />
        </div>

        <div id="humors" className="humors-title">
          <CarouselSlide
            categoryId="유머"
            slideClassName="leftSlideItem"
            cateEmoji="😄"
            slideContent="웃긴 이미지로 모두와 웃음을 나눠 보세요!"
          />
        </div>
      </div>
    </div>
  );
}
