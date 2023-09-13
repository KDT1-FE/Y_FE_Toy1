import React, { useState, useEffect } from 'react';
import { AddImageModal } from './GalleryAddImageModal';

export function SideBarLink() {
  return (
    <div className="sideBar-container">
      <ul className="category">
        <li>
          <a href="#allImages">전체보기</a>
        </li>
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
