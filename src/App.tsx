import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import { Notice, Chart, Benefit } from './views/company';
import Attendance from './views/AttendancePage';
import ProjectList from './views/ProjectList';
import GalleryPage from './views/GalleryPage';
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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}>
          <Route path="/company/notice" element={<Notice />} />
          <Route path="/company/chart" element={<Chart />} />
          <Route path="/company/benefit" element={<Benefit />} />
          <Route path="project" element={<ProjectList />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/notice/write" element={<NoticeWritePage />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
