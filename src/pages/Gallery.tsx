import React, { useState, useEffect } from 'react';
import { SideBarLink } from 'components/Gallery/NavBar';
import { MainSlides } from 'components/Gallery/SlideContainer';
import '../styles/pages/Gallery.scss';

const userNickname = sessionStorage.getItem('nickname');
const userId = sessionStorage.getItem('uid');
const userImage = sessionStorage.getItem('image');

export { userId, userNickname, userImage };

export function Gallery() {
  return (
    <div className="gallery-container">
      <SideBarLink />
      <MainSlides />
    </div>
  );
}
