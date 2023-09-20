import React from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/loginSlice';

interface ModalProps {
  setModal: (isOpen: boolean) => void;
}

interface StateValue {
  isLogin: boolean;
  name: string;
  email: string;
}

interface State {
  loginUpdate: StateValue;
}

const HeaderDropDown = ({ setModal }: ModalProps): JSX.Element => {
  const isLogin = useSelector((state: State) => {
    return state.loginUpdate.isLogin;
  });
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');

    dispatch(logout());
  };

  return isLogin ? (
    <nav className="header__drop-down shadow">
      <ul>
        <li
          onClick={() => {
            setModal(true);
          }}>
          근태관리
        </li>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
        <li onClick={handleLogout}>
          <Link to="/login">로그아웃</Link>
        </li>
      </ul>
    </nav>
  ) : (
    <></>
  );
};

export default HeaderDropDown;
