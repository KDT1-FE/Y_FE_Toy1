import * as React from 'react';

export function MainSwipers() {
  return (
    <div>
      <div className="inner">
        <div id="studyTips" style={{ height: '500px', background: 'skyblue' }}>
          공부꿀팁
        </div>
        <div id="events" style={{ height: '500px', background: 'orange' }}>
          이벤트
        </div>
        <div id="humors" style={{ height: '500px', background: 'gray' }}>
          유머
        </div>
      </div>
    </div>
  );
}
