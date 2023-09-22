import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { logoutAction } from '../../redux/action';
import './Header.scss';
import logo from '../../images/logo.png';
import { updateFirestoreUserStatus } from 'components/TimerUserCard/IsLoggedIn';
import { auth } from 'data/firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

export default function Header() {
  const user = useSelector((state: RootState) => state);
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        // 로그인한 경우
        const userId = authUser.uid;
        setIsLoggedIn(true);
        updateFirestoreUserStatus(userId, true);
      }
    });
  }, []);

  const handleLogout = () => {
    const user = auth.currentUser;
    if (user) {
      setIsLoggedIn(false);
      updateFirestoreUserStatus(user.uid, false);
      // Firebase Auth에서 로그아웃
      auth.signOut();
    }

    dispatch(logoutAction());
    sessionStorage.clear();
  };

  return (
    <header>
      <div className="header-container">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </div>
        <div className="pageList">
          <div className="pageListed">
            <Link
              to="/"
              className={`page ${location.pathname === '/' ? 'active' : ''}`}
            >
              Main
            </Link>
            <Link
              to="/wiki"
              className={`page ${
                location.pathname === '/wiki' ? 'active' : ''
              }`}
            >
              Wiki
            </Link>
            <Link
              to="/gallery"
              className={`page ${
                location.pathname === '/gallery' ? 'active' : ''
              }`}
            >
              Gallery
            </Link>
            <Link
              to="/study"
              className={`page ${
                location.pathname === '/study' ? 'active' : ''
              }`}
            >
              Study
            </Link>
          </div>
        </div>
        <div className="auth-buttons">
          {user.uid ? ( // 사용자가 로그인한 경우
            <div className="userInfo-container">
              <div className="userNickname-container">
                <span className="userNickname">{user.nickname}님</span>
                <span className="userWelcome">환영해요!</span>
              </div>
              <button className="logoutBtn" onClick={handleLogout}>
                로그아웃
              </button>
            </div>
          ) : (
            // 사용자가 로그인하지 않은 경우
            <>
              <Link to="SignIn" className="signInBtn">
                로그인
              </Link>
              <Link to="/SignUp" className="signUpBtn">
                회원가입
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
