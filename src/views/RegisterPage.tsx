import React from 'react';
import { BsFillXCircleFill, BsCheckCircleFill } from 'react-icons/bs';

import {
  FormTitle,
  InputEmail,
  InputName,
  InputPassword,
  InputPasswordConfirm,
  SubmitButton,
  ChangeAuthPage,
} from '../components/Auth';

import '../scss/authPage.scss';

export const RegisterPage = (): JSX.Element => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    /* ------------------------------------ validation function ----------------------------------- */

    /* ------------------------------ set firestore ----------------------------- */

    /* -------------------------------- firebase Authentication -------------------------------- */
  };

  return (
    <form className="authForm signup" onSubmit={handleSubmit}>
      <FormTitle title="SIGN UP" />

      <InputEmail />
      <InputName />
      <InputPassword />
      <InputPasswordConfirm />

      <SubmitButton content="SIGN UP" />

      <ChangeAuthPage target="/login" />
    </form>
  );
};
