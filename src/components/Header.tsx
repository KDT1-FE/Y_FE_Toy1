import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import HeaderDropDown from './HeaderDropDown';
import AttendanceModal from './AttendanceModal';

import '../scss/components/_userInfo.scss';
import '../scss/components/_header.scss';

const Header = (): JSX.Element => {
  const [dropDownOpen, setDropDownOpen] = useState<boolean>(false);
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
              setDropDownOpen(!dropDownOpen);
            }}>
            <div className="header__user-info-img"></div>
            <span className="header__user-info-name">김땡땡</span>
          </div>
          <Link to="/login">
            <button className="header__user-login-btn btn">로그인</button>
          </Link>
        </div>

        {dropDownOpen && <HeaderDropDown setModal={setModal} />}
      </header>
      {modal && <AttendanceModal isOpen={modal} onClose={() => setModal(false)} />}
    </>
  );
};

export default Header;
