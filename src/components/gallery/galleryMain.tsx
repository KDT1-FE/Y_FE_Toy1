import React from 'react';
import { StudyTipsSwiper } from './GallerySwiper1';

export function MainSwipers() {
  return (
    <div>
      <div className="inner">
        <div id="allImages">
          <div className="allImages-title">
            <h3>전체보기</h3>
          </div>
        </div>

        <div id="studyTips">
          <div className="studyTips-title">
            <h3>공부꿀팁</h3>
          </div>
          <StudyTipsSwiper />
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
