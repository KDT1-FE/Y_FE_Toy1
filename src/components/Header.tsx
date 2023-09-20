import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import AttendanceModal from './Attendance/AttendanceModal';

import '../scss/components/_userInfo.scss';
import '../scss/components/_header.scss';

const Header = (): JSX.Element => {
  const [userInfoOpen, setUserInfoOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  return (
    <>
      <header className="header shadow">
        <div className="header__logo">
          <Link to="/">
            <span> HIGH FIVE</span>
            {/* <img src="" alt="" />*/}
          </Link>
        </div>
        <div className="header__user">
          <div
            className="header__user-info"
            onClick={() => {
              setUserInfoOpen(!userInfoOpen);
            }}>
            <div className="header__user-info-img"></div>
            <span className="header__user-info-name">김땡땡</span>
          </div>
          <Link to="/login">
            <button className="header__user-login-btn btn">로그인</button>
          </Link>
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
        {userInfoOpen && <UserInfo />}
      </header>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Header;
