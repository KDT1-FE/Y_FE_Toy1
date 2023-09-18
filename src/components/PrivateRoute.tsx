import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';

import Navigation from './NavBar';
import loginState from '../recoil/atoms/loginState';

function LoginCheckRoute() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState);

  useEffect(() => {
    if (!isLogin) {
      navigate('/login');
    }
  }, []);

  return isLogin !== true ? null : (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}

export default LoginCheckRoute;
