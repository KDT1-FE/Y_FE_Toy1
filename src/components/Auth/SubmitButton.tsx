import React from 'react';

import '../../scss/components/auth/submitButton.scss';

export const SubmitButton = ({ content }): JSX.Element => {
  return (
    <button type="submit" className="authForm__button" disabled>
      {content}
    </button>
  );
};
