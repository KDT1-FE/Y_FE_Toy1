import React, { ReactEventHandler } from 'react';

import { NavLink, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import getLoginAuth from '../../../hooks/getLoginAuth';
import {
  logoutFunction,
  loginDataAlreadyRetrived,
} from '../../../hooks/getAuth';
import { getLocalData } from '../../../hooks/getStorageAuthData';

const LoginButtons = styled(NavLink)`
  font-size: 1rem;
  color: var(--color-white);
  background-color: var(--color-primary);
  border: none;
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  text-decoration-line: none;
`;

const handleLogout: ReactEventHandler<HTMLAnchorElement> = e => {
  e.preventDefault();
  logoutFunction();
  window.location.href = '/';
};

const LoginButton = () => {
  const isLogin = getLoginAuth();
  const navigate = useNavigate();

  const handleLogin: ReactEventHandler<HTMLAnchorElement> = e => {
    e.preventDefault();
    if (getLocalData()) {
      navigate('/choose');
    } else {
      navigate('/login');
    }
  };

  if (isLogin) {
    return (
      <LoginButtons
        to="/"
        onClick={handleLogout}
      >
        로그아웃
      </LoginButtons>
    );
  }
  return (
    <LoginButtons
      to="/login"
      onClick={handleLogin}
    >
      로그인
    </LoginButtons>
  );
};

export default LoginButton;
