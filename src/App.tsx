import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Wiki from './pages/WikiPage/Wiki';
import WikiWrite from './pages/WikiPage/WikiWrite';
import ItemContent from './pages/WikiPage/ItemContent';
import WikiEdit from './pages/WikiPage/WikiEdit';
import Login from './pages/LoginPage/Login';
import SignUp from './pages/LoginPage/SignUp';
import CreateAccount from './pages/LoginPage/CreateAccount';
import NoticeList from './pages/NoticePage/NoticeList';
import NoticeDetail from './pages/NoticePage/NoticeDetail';
import PrivateRoute from './components/PrivateRoute';
import Main from './pages/MainPage/Main';
import PublicRoute from './components/PublicRoute';
import NewWrite from './pages/NoticePage/write/EditWrite';
import EditWrite from './pages/NoticePage/write/NewWrite';

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
        <Route path='/notice/write' element={<NewWrite />} />
        <Route path='/notice/:noticeId/edit' element={<EditWrite />} />
        <Route path='/notice/:noticeId' element={<NoticeDetail />} />
        <Route path='/wiki' element={<Wiki />} />
        <Route path='/wiki/write' element={<WikiWrite />} />
        <Route path='/wiki/content' element={<ItemContent />} />
        <Route path='/wiki/edit' element={<WikiEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
