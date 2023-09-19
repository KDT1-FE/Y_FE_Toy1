import React from 'react';
import { CarouselSlide } from './SlideRow';

export function MainSlides(): JSX.Element {
  return (
    <div>
      <div className="inner">
        <div id="studyTips" className="studyTips-title">
          <CarouselSlide
            categoryId="StudyTipsGallery"
            slideClassName="leftSlideItem"
          />
        </div>

        <div id="events" className="events-title">
          <CarouselSlide
            categoryId="EventsGallery"
            slideClassName="rightSlideItem"
          />
        </div>

        <div id="humors" className="humors-title">
          <CarouselSlide
            categoryId="HumorsGallery"
            slideClassName="leftSlideItem"
          />
        </div>
      </div>
    </div>
  );
}
