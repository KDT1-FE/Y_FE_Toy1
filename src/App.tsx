import React from "react";
import { Routes, Route } from "react-router-dom";
import Wiki from "./pages/WikiPage/Wiki";
import WikiWrite from "./pages/WikiPage/WikiWrite";
import ItemContent from "./pages/WikiPage/ItemContent";
import WikiEdit from "./pages/WikiPage/WikiEdit";
import Login from "./pages/LoginPage/Login";
import NoticeWrite from "./pages/NoticePage/NoticeWrite";
import SignUp from "./pages/LoginPage/SignUp";
import CreateAccount from "./pages/LoginPage/CreateAccount";
import NoticeList from "./pages/NoticePage/NoticeList";
import NoticeDetail from "./pages/NoticePage/NoticeDetail";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./pages/MainPage/Main";
import PublicRoute from "./components/PublicRoute";
import ProjectInputPage from "./pages/ProjectPage/ProjectInput";
import ProjectDetail from "./pages/ProjectPage/ProjectDetail";
import ProjectList from "./pages/ProjectPage/ProjectList";
// 프로젝트 데이터를 정의
const projects = [
  {
    id: 1,
    team: "팀 A",
    title: "프로젝트 1",
    deadline: "2023-12-31",
    teamSize: 5,
  },
  {
    id: 2,
    team: "팀 B",
    title: "프로젝트 2",
    deadline: "2023-10-15",
    teamSize: 3,
  },
  // 추가 프로젝트 데이터
];
function App() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/createaccount" element={<CreateAccount />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<Main />} />
        <Route path="/notice" element={<NoticeList />} />
        <Route path="/noticewrite" element={<NoticeWrite />} />
        <Route path="/notice/:noticeId" element={<NoticeDetail />} />
      </Route>
      <Route element={<PublicRoute />}>
        <Route path="/project" element={<ProjectDetail />} />
        <Route
          path="/projectlist"
          element={<ProjectList projects={projects} />}
        />
        <Route path="/projectinput" element={<ProjectInputPage />} />
        <Route path="/" element={<Main />} />
        <Route path="/wiki" element={<Wiki />} />
        <Route path="/wiki/write" element={<WikiWrite />} />
        <Route path="/wiki/content" element={<ItemContent />} />
        <Route path="/wiki/edit" element={<WikiEdit />} />
      </Route>
    </Routes>
  );
}

export default App;
