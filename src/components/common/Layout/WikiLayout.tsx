import React from 'react';
import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import SidebarWiki from '../SidebarWiki';
import HeaderComponent from '../Header';
import Footer from '../Footer';

const WikiWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 0 5%;

  display: flex;
  justify-content: center;
`;

const Inner = styled.div`
  box-sizing: border-box;
  width: 100%;
  max-width: 1500px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  @media screen and (min-width: 1560px) {
    padding: 0 5%;
    justify-content: center;
  }
`;

const Wiki = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;

  width: 100%;
  max-width: 1500px;
  height: 100%;
  padding: 8rem 0;
`;

const WikiLayout = () => {
  return (
    <>
      <HeaderComponent transparent="false" />
      <WikiWrapper>
        <Inner>
          <Wiki>
            <SidebarWiki />
            <Outlet />
          </Wiki>
        </Inner>
      </WikiWrapper>
      <Footer />
    </>
  );
};

export default WikiLayout;
