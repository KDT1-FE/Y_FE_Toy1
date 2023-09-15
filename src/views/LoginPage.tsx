import React from 'react';
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs';

import { FormTitle, InputEmail, InputPassword, SubmitButton, ChangeAuthPage } from '../components/Auth';

import '../scss/loginPage.scss';

export const LoginPage = (): JSX.Element => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ------------------------------------ validation function ----------------------------------- */

    /* ------------------------------ set firestore ----------------------------- */

    /* -------------------------------- firebase Authentication -------------------------------- */
  };

  return (
    <form className="authForm signin" onSubmit={handleSubmit}>
      <FormTitle title="SIGN IN" />

      <InputEmail />
      <InputPassword />

      <SubmitButton content="SIGN IN" />

      <ChangeAuthPage target="/resister" />
    </form>
  );
};
