import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { Outlet, useNavigate } from "react-router-dom";

import userState from "../recoil/atoms/userState";

function PublicRoute() {
  const navigate = useNavigate()
  const user = useRecoilValue(userState)

  useEffect(() => {
    if (user.isLogin) {
      navigate("/")
    }
  }, [])

  return (
    <Outlet />
  )
}

export default PublicRoute