import React, { useState, useEffect } from 'react';
import './NavBar.scss';
import { AddImageModal } from './ModalAddImage';
import { RootState } from 'redux/types'; // RootState 타입 추가
import { useSelector } from 'react-redux';

export function SideBarLink() {
  const user = useSelector((state: RootState) => state);

  return (
    <div className="sideBar-container">
      {user.uid ? (
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
