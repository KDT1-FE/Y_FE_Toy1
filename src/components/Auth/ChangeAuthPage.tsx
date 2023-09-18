import { Link } from 'react-router-dom';

import '../../scss/components/auth/changeAuthPage.scss';

interface ChangeAuthPageProps {
  target: string;
}

export const ChangeAuthPage = ({ target }: ChangeAuthPageProps): JSX.Element => {
  const checkTarget = (target: string) => {
    return <Link to={target}>{target === '/register' ? 'Sign Up' : 'Sign In'}</Link>;
  };

  return <div className="link">Not a member? {checkTarget(target)}</div>;
};
