import React from 'react';

import '../../scss/components/auth/formTitle.scss';

export const FormTitle = ({ title }): JSX.Element => {
  return <div className="authForm__title">{title}</div>;
};
