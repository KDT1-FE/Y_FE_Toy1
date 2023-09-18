import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';

import '../scss/base/_index.scss';
import '../scss/landingPage.scss';
import WritePage from './WritePage';

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <div className="landingContent">
        <SideBar />
        <WritePage />
        <Outlet />
      </div>
    </div>
  );
};
