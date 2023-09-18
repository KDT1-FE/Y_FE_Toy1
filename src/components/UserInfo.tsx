import React from 'react';
import { Link } from 'react-router-dom';

const UserInfo = (): JSX.Element => {
  return (
    <nav className="header__drop-down shadow">
      <ul>
        <li>
          <Link to="/">근태관리</Link>
        </li>
        <li>
          <Link to="/">마이페이지</Link>
        </li>
        <li>로그아웃</li>
      </ul>
    </nav>
  );
};

export default UserInfo;
