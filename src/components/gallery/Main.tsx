import React from 'react';
import { Swiper } from './Swiper';

export function MainSwipers(): JSX.Element {
  const studyTipsId = 'StudyTipsGallery';

  return (
    <div>
      <div className="inner">
        <div id="studyTips" className="studyTips-title">
          <Swiper categoryId="StudyTipsGallery" />
        </div>

        <div id="events" className="events-title">
          <Swiper categoryId="EventsGallery" />
        </div>

        <div id="humors" className="humors-title">
          <Swiper categoryId="HumorsGallery" />
        </div>
      </div>
    </div>
  );
}
