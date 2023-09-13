import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider'; 

export default function Root() {
  return (
    <div>
      <Header />
      <section>
        <ImageSlider /> 
        <Outlet />
      </section>
    </div>
  );
}
