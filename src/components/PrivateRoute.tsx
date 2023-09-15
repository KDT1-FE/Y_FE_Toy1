import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";

import userState from "../recoil/atoms/userState";

function LoginCheckRoute() {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)

  useEffect(() => {
    if (!user.isLogin) {
      navigate("/login")
    }
  }, [])

  return user.isLogin !== true ? null : <Outlet />
}

export default LoginCheckRoute