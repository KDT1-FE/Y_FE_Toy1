import React from 'react';
import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import SidebarGallery from '../SidebarGallery';
import HeaderComponent from '../Header';
import Footer from '../Footer';

const GalleryWrapper = styled.div`
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  padding: 0 5%;
`;

const Gallery = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  gap: 50px;
  max-width: 1500px;
  min-width: 1300px;
  height: 100%;
  margin: auto;
  padding: 8rem 0;
  @media screen and (min-width: 1500px) {
    justify-content: space-evenly;
    gap: 90px;
  }
`;

const GalleryLayout = () => {
  return (
    <>
      <HeaderComponent transparent="false" />
      <GalleryWrapper>
        <Gallery>
          <SidebarGallery />
          <Outlet />
        </Gallery>
      </GalleryWrapper>
      <Footer />
    </>
  );
};

export default GalleryLayout;
