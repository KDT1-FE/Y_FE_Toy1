import React, { useState, useEffect } from 'react';
import { AddImageModal } from './ModalImage';

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
      <AddImageModal />
    </div>
  );
}
