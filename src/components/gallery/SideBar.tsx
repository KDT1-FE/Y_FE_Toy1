import React, { useState, useEffect } from 'react';
import './SideBar.scss';
import { AddImageModal } from './ModalImage';
import { userId, userNickname } from 'pages/Gallery';
import gsap from 'gsap';

export function SideBarLink() {
  //   useEffect(() => {
  //     if (window.scrollY > 550) {
  //       gsap.to('.sideBar-container', 0.6, {
  //         opacity: 0,
  //         display: 'none',
  //       });
  //     } else {
  //       gsap.to('.sideBar-container', 0.6, {
  //         opacity: 1,
  //         display: 'block',
  //       });
  //     }
  // }, []);

  return (
    <div className="sideBar-container">
      <h3>
        {userNickname ? (
          `${userNickname}님 반갑습니다!`
        ) : (
          <a href="/SignIn">로그인을 해주세요!</a>
        )}
      </h3>
      <AddImageModal />
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
