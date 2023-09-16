import React from 'react';

import '../../scss/components/auth/input.scss';

export const InputEmail = (): JSX.Element => {
  return (
    <div className="input-container">
      <input type="text" id="signin-userid" name="userid" required autoComplete="off" />

      <label htmlFor="signin-userid">Email</label>

      <span className="input-container__bar"></span>

      <i className="icon icon-success bx bxs-check-circle hidden"></i>
      <i className="icon icon-error bx bxs-x-circle hidden"></i>

      <div className="error"></div>
    </div>
  );
};
