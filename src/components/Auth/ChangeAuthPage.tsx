import React from 'react';
import { Link } from 'react-router-dom';

import '../../scss/components/auth/changeAuthPage.scss';

export const ChangeAuthPage = ({ target }): JSX.Element => {
  const checkTarget = (target: string) => {
    return <Link to={target}>{target === '/resister' ? 'Sign Up' : 'Sign In'}</Link>;
  };

  return <div className="link">Not a member? {checkTarget(target)}</div>;
};
