import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LandingPage from './views/LandingPage';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import { Notice, Chart, Benefit } from './views/company';
import Attendance from './views/AttendancePage';
import ProjectList from './views/ProjectList';
import GalleryPage from './views/galleryPage';
import NoticeWritePage from './views/NoticeWritePage';
import Contents from './views/Contents';
import NoticeUpdatePage from './views/NoticeUpdatePage';

import { useDispatch } from 'react-redux';
import { login } from './store/loginSlice';
import ProjectWirte from './views/ProjectWirte';
import ProjectDetail from './views/ProjectDetail';
import ProjectUpdate from './views/ProjectUpdate';

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
          <Route path="/project" element={<ProjectList />} />
          <Route path='/project/:id' element={<ProjectDetail />} />
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
