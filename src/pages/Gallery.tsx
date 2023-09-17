import * as React from 'react';
import { SideBarLink } from 'components/Gallery/SideBar';
import { MainSlides } from 'components/Gallery/Main';

const userNickname = sessionStorage.getItem('nickname');
const userId = sessionStorage.getItem('uid');

export { userNickname, userId };

export function Gallery() {
  return (
    <div>
      <SideBarLink />
      <MainSlides />
    </div>
  );
}
