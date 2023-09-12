import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Layout, Home, About, Dashboard, NoMatch } from './pages/TestPage/Test';
import Login from './pages/LoginPage/Login';

import NoticeWrite from './pages/NoticePage/NoticeWrite';

function App() {
  return (
    <Routes>
      {/* *Route 기초* 추후 삭제 예정 */}
      {/* Route는 아래처럼 중첩 라우팅이 가능합니다! */}
      <Route path='/' element={<Layout />}>
        <Route index element={<Home />} />
        <Route path='about' element={<About />} />
        <Route path='dashboard' element={<Dashboard />} />
        {/* Using path="*"" means "match anything", so this route
                acts like a catch-all for URLs that we don't have explicit
                routes for. */}
        <Route path='*' element={<NoMatch />} />
      </Route>
      {/* *Route 기초* */}
      <Route path='/login' element={<Login />} />
      <Route path='/notice' element={<NoticeWrite />} />
    </Routes>
  );
}

export default App;
