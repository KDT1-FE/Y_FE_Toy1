import React from 'react';
import { Outlet, useLocation } from 'react-router-dom'; // useLocation 추가
import Header from '../components/Header';
import ImageSlider from '../components/ImageSlider';

export default function Root() {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <div>
      <Header />
      <section>
        <div className='main-container'>
          {/* ImageSlider를 메인 페이지에서만 렌더링 */}
          {location.pathname === '/' && <ImageSlider />}
          <Outlet />
        </div>
      </section>
    </div>
  );
}
