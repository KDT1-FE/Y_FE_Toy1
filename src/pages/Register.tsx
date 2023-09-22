import React from 'react';
import StyledHeader from '../components/common/Header';
import RegisterComponent from '../components/register';
import Footer from '../components/common/Footer';

const Register = () => {
  return (
    <>
      <StyledHeader transparent="false" />
      <RegisterComponent />
      <Footer />
    </>
  );
};

export default Register;
