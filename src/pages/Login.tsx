import React from 'react';
import userState from '../hooks/user';

const Login = () => {
  userState();
  return <div>Login</div>;
};

export default Login;
