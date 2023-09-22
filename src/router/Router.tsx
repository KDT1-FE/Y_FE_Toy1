import React from "react";
import { Route, Routes } from "react-router-dom";
import SubLayout from "../layouts/SubLayout";
import Main from "../pages/Main";
import Wiki from "../pages/Wiki";
import Project from "../pages/Project";
import ProjectNew from "../pages/ProjectNew";
import ProjectDetail from "../pages/ProjectDetail";
import Timer from "../pages/Timer";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import Employee from "../pages/Employee";
import WorkTime from "../pages/WorkTime";
import StartRegister from "../components/SignUp/Register/StartRegister";
import UserRegister from "../components/SignUp/Register/UserRegister";
import EndRegister from "../components/SignUp/Register/EndRegister";
import ProjectEdit from "../pages/ProjectEdit";
import EmployeeDetail from "../pages/EmployeeDetail";

const Router = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />}></Route>
      <Route path="/signup" element={<SignUp />}></Route>
      <Route path="/start-register" element={<StartRegister />}></Route>
      <Route path="/user-register" element={<UserRegister />}></Route>
      <Route path="/end-register" element={<EndRegister />}></Route>
      <Route element={<SubLayout />}>
        <Route path="/" index element={<Main />}></Route>
        <Route path="/wiki" element={<Wiki />}></Route>
        <Route path="/project" element={<Project />}></Route>
        <Route
          path="/project/all"
          element={<ProjectDetail isDefault={true} />}
        ></Route>
        <Route
          path="/project/new"
          element={<ProjectNew isEdit={false} />}
        ></Route>
        <Route
          path="/project/:projectId"
          element={<ProjectDetail isDefault={false} />}
        ></Route>
        <Route
          path="/project/:projectId/edit"
          element={<ProjectEdit isEdit={true} />}
        ></Route>
        <Route path="/employee" element={<Employee />}></Route>
        <Route path="/employee/:memberId" element={<EmployeeDetail />}></Route>
        <Route path="/employee/team" element={<Employee />}></Route>
        <Route
          path="/employee/team/:teamId"
          element={<EmployeeDetail />}
        ></Route>
        <Route path="/timer" element={<Timer />}></Route>
        <Route path="/worktime" element={<WorkTime />}></Route>
      </Route>
    </Routes>
  );
};

export default Router;
