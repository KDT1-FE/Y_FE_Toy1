import * as React from 'react';
import { SideBarLink } from 'components/Gallery/GallerySideBar';
import { MainSwipers } from 'components/Gallery/GalleryMain';

export function Gallery() {
  return (
    <div>
      <SideBarLink />
      <MainSwipers />
    </div>
  );
}
