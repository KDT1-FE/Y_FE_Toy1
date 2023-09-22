import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const NonProtectedRoute = () => {
  return <Outlet />;
};

export default NonProtectedRoute;
