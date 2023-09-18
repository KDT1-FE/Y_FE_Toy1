import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import { Notice, Chart, Bylaws } from './views/company';
import Attendance from './views/AttendancePage';
import ProjectList from './views/ProjectList';
import GalleryPage from './views/galleryPage';
import WritePage from './views/WritePage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/company/notice" element={<Notice />} />
          <Route path="/company/chart" element={<Chart />} />
          <Route path="/company/bylaws" element={<Bylaws />} />
          <Route path="project" element={<ProjectList />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/write" element={<WritePage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="attendance" element={<Attendance />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
