import React from 'react';
import { Slide } from './Slide';

export function MainSlides(): JSX.Element {
  return (
    <div>
      <div className="inner">
        <div id="studyTips" className="studyTips-title">
          <Slide categoryId="StudyTipsGallery" />
        </div>

        <div id="events" className="events-title">
          <Slide categoryId="EventsGallery" />
        </div>

        <div id="humors" className="humors-title">
          <Slide categoryId="HumorsGallery" />
        </div>
      </div>
    </div>
  );
}
