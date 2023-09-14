import * as React from 'react';
import { SideBarLink } from 'components/Gallery/SideBar';
import { MainSwipers } from 'components/Gallery/Main';

export function Gallery() {
  return (
    <div>
      <SideBarLink />
      <MainSwipers />
    </div>
  );
}
