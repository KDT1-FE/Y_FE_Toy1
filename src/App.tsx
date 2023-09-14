import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Login from './pages/LoginPage/Login';
import NoticeWrite from './pages/NoticePage/NoticeWrite';
import SignUp from './pages/LoginPage/SignUp';
import CreateAccount from './pages/LoginPage/CreateAccount';
import NoticeList from './pages/NoticePage/NoticeList';
import NoticeDetail from './pages/NoticePage/NoticeDetail';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/MainPage/Main';
import PublicRoute from './components/PublicRoute';

function App() {

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/createaccount' element={<CreateAccount />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path='/' element={<Main />} />
        <Route path='/notice' element={<NoticeList />} />
        <Route path='/noticewrite' element={<NoticeWrite />} />
        <Route path='/notice/:noticeId' element={<NoticeDetail />} />
      </Route>
    </Routes>
  );
}

export default App;
