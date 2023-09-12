import * as React from 'react';
import { SideBarLink } from 'components/gallery/gallerySideBar';
import { MainSwipers } from 'components/gallery/galleryMain';

export function Gallery() {
  return (
    <div>
      <SideBarLink />
      <MainSwipers />
    </div>
  );
}
