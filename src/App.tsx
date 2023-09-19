import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import { Notice, Chart, Bylaws } from './views/company';
import Attendance from './views/AttendancePage';
import ProjectList from './views/ProjectList';
import GalleryPage from './views/galleryPage';
import NoticeWritePage from './views/NoticeWritePage';

import { useDispatch } from 'react-redux';
import { login } from './store/loginSlice';

const App = () => {
  const isLogin = localStorage.getItem('isLogin');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');

  const dispatch = useDispatch();

  if (isLogin) {
    if (JSON.parse(isLogin)) {
      dispatch(login({ userName, userEmail }));
    }
  }

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />}>
            <Route path="/company/notice" element={<Notice />} />
            <Route path="/company/chart" element={<Chart />} />
            <Route path="/company/bylaws" element={<Bylaws />} />
            <Route path="project" element={<ProjectList />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/notice/write" element={<NoticeWritePage />} />
          </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="attendance" element={<Attendance />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
