import React from 'react';
import { SideBarLink } from '../components/Gallery/NavBar';
import { MainSlides } from '../components/Gallery/SlideContainer';
import '../styles/pages/Gallery.scss';

export function Gallery(): JSX.Element {
  return (
    <div className="gallery-container">
      <SideBarLink />
      <MainSlides />
    </div>
  );
}
