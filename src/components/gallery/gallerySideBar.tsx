import React, { useRef } from 'react';

export function SideBarLink() {
  return (
    <div>
      <ul>
        <li>
          <a href="#studyTips">공부꿀팁</a>
        </li>
        <li>
          <a href="#events">이벤트</a>
        </li>
        <li>
          <a href="#humors">유머</a>
        </li>
      </ul>

      {/* main에서 id 가져오기 */}
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
  );
}
