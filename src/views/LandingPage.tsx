import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../components/Header';
import SideBar from '../components/SideBar';

import '../scss/base/_index.scss';
import '../scss/landingPage.scss';

const LandingPage = (): JSX.Element => {
  return (
    <div className="landingpage">
      <Header />
      <div className="landingContent">
        <SideBar />
        <Outlet />
      </div>
    </div>
  );
};

export default LandingPage;
