import React, { useState, useEffect } from 'react';
import { AddImageModal } from './ModalImage';
import { userId, userNickname } from 'pages/Gallery';

export function SideBarLink() {
  return (
    <div className="sideBar-container">
      <h3>
        {userId} {userNickname}님 반갑습니다!
      </h3>
      <ul className="category">
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
      <AddImageModal />
    </div>
  );
}
