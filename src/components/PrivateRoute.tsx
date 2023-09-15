import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Outlet, Route, useNavigate } from "react-router-dom";

import userState from "../recoil/atoms/userState";
import Login from "../pages/LoginPage/Login";

function LoginCheckRoute() {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login")
    }
  }, [])

  return user.isLogin !== true ? <Route path='/' element={<Login />} /> : <Outlet />
}

export default LoginCheckRoute