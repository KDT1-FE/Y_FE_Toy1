import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Outlet, Route, useNavigate } from "react-router-dom";

import userState from "../recoil/atoms/userState";
import Main from "../pages/MainPage/Main";

function PublicRoute() {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)

  useEffect(() => {
    if (user.isLogin) {
      navigate("/")
    }
  }, [])

  return user.isLogin === true ? <Route path='/' element={<Main />} /> : <Outlet />
}

export default PublicRoute