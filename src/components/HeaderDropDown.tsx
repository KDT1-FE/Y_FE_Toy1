import React from 'react';
import { Link } from 'react-router-dom';

const HeaderDropDown = ({ setModal }): JSX.Element => {
  return (
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
        <li>로그아웃</li>
      </ul>
    </nav>
  );
};

export default HeaderDropDown;
