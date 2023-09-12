import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Header';

export default function Root() {
  return (
    <div>
      <Header /> {/* Header 컴포넌트를 사용합니다. */}
      <section>
        <Outlet />
      </section>
    </div>
  );
}