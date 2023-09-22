import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Korean from './pages/Korean';
import Chinese from './pages/Chinese';
import Japanese from './pages/Japanese';
import Western from './pages/Western';
import Login from './pages/Login';
import NoticePage from './pages/Notice';
import IntroPage from './pages/Intro';
import With from './pages/With';
import WikiLayout from './components/common/Layout/WikiLayout';
import GalleryLayout from './components/common/Layout/GalleryLayout';
import Register from './pages/Register';
import ChooseId from './pages/ChooseId';

const App = () => {
  return (
    <Routes>
      {/* 홈 라우팅 */}
      <Route
        path="/"
        element={<Home />}
      />
      {/* 위치 페이지 라우팅 */}
      <Route
        path="/wiki/*"
        element={<WikiLayout />}
      >
        <Route
          path="notice"
          element={<NoticePage />}
        />
        <Route
          path="intro"
          element={<IntroPage />}
        />
        <Route
          path="with"
          element={<With />}
        />
        <Route
          index
          element={<Navigate to="/wiki/notice" />}
        />
      </Route>
      {/* 갤러리 페이지 라우팅 */}
      <Route
        path="/gallery/*"
        element={<GalleryLayout />}
      >
        <Route
          path="korean"
          element={<Korean />}
        />
        <Route
          path="chinese"
          element={<Chinese />}
        />
        <Route
          path="japanese"
          element={<Japanese />}
        />
        <Route
          path="western"
          element={<Western />}
        />
        <Route
          index
          element={<Navigate to="/gallery/korean" />}
        />
      </Route>
      <Route
        path="/register/"
        element={<Register />}
      />
      <Route
        path="/login/"
        element={<Login />}
      />
      <Route
        path="/choose/"
        element={<ChooseId />}
      />
    </Routes>
  );
};

export default App;
