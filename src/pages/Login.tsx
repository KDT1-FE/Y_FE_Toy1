import React from 'react';
import StyledHeader from '../components/common/Header';
import LoginComponent from '../components/login';
import Footer from '../components/common/Footer';

const Login = () => {
  return (
    <>
      <StyledHeader transparent="false" />
      <LoginComponent />
      <Footer />
    </>
  );
};

export default Login;
