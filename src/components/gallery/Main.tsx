import React from 'react';
import { Swiper } from './Swiper';

export function MainSwipers(): JSX.Element {
  return (
    <div>
      <div className="inner">
        <div id="studyTips" className="studyTips-title">
          <Swiper title="Study Tips" id="studyTips" />
        </div>

        <div id="events">
          <div className="events-title">
            <h3>이벤트</h3>
          </div>
        </div>

        <div id="humors">
          <div className="humors-title">
            <h3>유머</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
