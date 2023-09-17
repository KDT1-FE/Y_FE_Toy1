import React from 'react';

import '../../scss/components/auth/input.scss';

export const InputPassword = (): JSX.Element => {
  return (
    <div className="input-container">
      <input type="password" id="signin-password" name="password" required autoComplete="off" />

      <label htmlFor="signin-password">Password</label>

      <span className="input-container__bar"></span>

      <i className="icon icon-success bx bxs-check-circle hidden"></i>
      <i className="icon icon-error bx bxs-x-circle hidden"></i>

      <div className="error"></div>
    </div>
  );
};
