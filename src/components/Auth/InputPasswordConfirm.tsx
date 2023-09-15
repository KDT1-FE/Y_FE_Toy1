import React from 'react';

import '../../scss/components/auth/input.scss';

// import '../../scss/components/auth/input.scss';

export const InputPasswordConfirm = (): JSX.Element => {
  return (
    <div className="input-container">
      <input type="password" id="signup-confirm-password" name="confirm-password" required autoComplete="off" />

      <label htmlFor="signup-confirm-password">Confirm Password</label>

      <span className="input-container__bar"></span>

      <i className="icon icon-success bx bxs-check-circle hidden"></i>
      <i className="icon icon-error bx bxs-x-circle hidden"></i>

      <div className="error"></div>
    </div>
  );
};
