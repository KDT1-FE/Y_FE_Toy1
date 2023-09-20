import React, { useState, useEffect } from 'react';
import './SideBar.scss';
import { AddImageModal } from './ModalImage';
import { userId, userNickname } from 'pages/Gallery';

export function SideBarLink() {
  return (
    <div className="sideBar-container">
      {userNickname ? (
        <AddImageModal />
      ) : (
        <a href="/SignIn">이미지를 공유하고 싶다면 로그인을 해주세요!</a>
      )}
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
    </div>
  );
}
