import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { Outlet, useNavigate } from 'react-router-dom';

import loginState from '../recoil/atoms/loginState';

function PublicRoute() {
  const navigate = useNavigate();
  const isLogin = useRecoilValue(loginState)

  useEffect(() => {
    if (isLogin) {
      navigate('/');
    }
  }, []);

  return isLogin === true ? null : <Outlet />;
}

export default PublicRoute;
