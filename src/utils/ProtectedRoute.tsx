import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import getLoginAuth from '../hooks/getLoginAuth';

const ProtectedRoute = () => {
  const isLogin = getLoginAuth();
  const currentLocation = useLocation();

  return isLogin ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{ redirectedFrom: currentLocation }}
    />
  );
};

export default ProtectedRoute;
