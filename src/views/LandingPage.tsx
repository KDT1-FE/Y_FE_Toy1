import React from 'react';
import Header from '../components/Header';
import '../scss/base/_index.scss';
import SideBar from '../components/SideBar';

export const LandingPage = (): JSX.Element => {
  return (
    <div>
      <Header />
      <SideBar />
    </div>
  );
};
