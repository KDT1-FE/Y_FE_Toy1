import { useState } from 'react';
import { Link } from 'react-router-dom';
import UserInfo from './UserInfo';
import '../scss/components/_header.scss';
import '../scss/components/_userInfo.scss';

const Header = (): JSX.Element => {
  const [userInfoOpen, setUserInfoOpen] = useState<boolean>(false);
  return (
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
      {userInfoOpen && <UserInfo />}
    </header>
  );
};

export default Header;
