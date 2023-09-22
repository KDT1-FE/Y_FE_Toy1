import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import { Notice, Chart, Benefit } from './pages/company';
import MainPage from './pages/MainPage';
import Attendance from './pages/AttendancePage';
import ProjectList from './pages/project/ProjectListPage';
import GalleryPage from './pages/GalleryPage';
import NoticeWritePage from './pages/company/noticePage/NoticeWritePage';
import Contents from './pages/company/noticePage/NoticeDetailPage';
import NoticeUpdatePage from './pages/company/noticePage/NoticeUpdatePage';
import ProjectWirte from './pages/project/ProjectWirtePage';
import ProjectDetail from './pages/project/ProjectDetailPage';
import ProjectUpdate from './pages/project/ProjectUpdatePage';

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
          <Route index element={<MainPage />}></Route>
          <Route path="/company/notice" element={<Notice />} />
          <Route path="/company/chart" element={<Chart />} />
          <Route path="/company/benefit" element={<Benefit />} />
          <Route path="/project" element={<ProjectList />} />
          <Route path="/project/:id" element={<ProjectDetail />} />
          <Route path="/project/write" element={<ProjectWirte />} />
          <Route path="/project/update/:id" element={<ProjectUpdate />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/notice/write" element={<NoticeWritePage />} />
          <Route path="/notice/content/:itemId" element={<Contents />} />
          <Route path="/notice/content/update/:itemId" element={<NoticeUpdatePage />} />
          <Route path="attendance" element={<Attendance />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
