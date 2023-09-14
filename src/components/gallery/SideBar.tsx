import React, { useState, useEffect } from 'react';
import { Modal } from './Modal';
import { ImageDragDrop } from './ImageDragDrop';

export function SideBarLink() {
  const [isModal, setIsModal] = useState('');

  return (
    <div className="sideBar-container">
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
      <Modal btnName="이미지 추가" contents={ImageDragDrop} />
    </div>
  );
}
