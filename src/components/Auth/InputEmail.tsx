import React from 'react';

export const InputEmail = (): JSX.Element => {
  return (
    <div className="input-container">
      <input type="text" id="signin-userid" name="userid" required autoComplete="off" />
      <label htmlFor="signin-userid">email</label>
      <span className="bar"></span>
      <i className="icon icon-success bx bxs-check-circle hidden"></i>
      <i className="icon icon-error bx bxs-x-circle hidden"></i>
      <div className="error"></div>
    </div>
  );
};
