import React from "react";
import { Routes, Route } from "react-router-dom";

import Login from "./pages/LoginPage/Login";
import NoticeWrite from "./pages/NoticePage/NoticeWrite";
import SignUp from "./pages/LoginPage/SignUp";
import CreateAccount from "./pages/LoginPage/CreateAccount";
import NoticeList from "./pages/NoticePage/NoticeList";
import NoticeDetail from "./pages/NoticePage/NoticeDetail";

import Main from "./pages/MainPage/Main";

import ProjectInputPage from "./pages/ProjectPage/ProjectInput";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/createaccount" element={<CreateAccount />} />

      <Route path="/" element={<Main />} />
      <Route path="/notice" element={<NoticeList />} />
      <Route path="/noticewrite" element={<NoticeWrite />} />
      <Route path="/notice/:noticeId" element={<NoticeDetail />} />
      <Route path="/projectinput" element={<ProjectInputPage />} />
    </Routes>
  );
}

export default App;
