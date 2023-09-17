import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import AttendanceModal from './AttendanceModal';

import '../scss/components/_header.scss';

const Header = (): JSX.Element => {
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
      <header className="header shadow">
        <div className="header__logo">
          <Link to="/">
            <span> HIGH FIVE</span>
            {/* <img src="" alt="" />*/}
          </Link>
        </div>

        <div className="header__user">
          <div className="header__user-img"></div>
          <span className="header__user-name">김땡땡</span>
          <button className="header__user-login-btn btn">로그인</button>
        </div>
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
      </header>
    </>
  );
};

export default Header;
