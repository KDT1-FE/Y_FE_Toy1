import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types';
import { logoutAction } from '../../redux/action';
import './Header.css';
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
      } else {
        // 로그아웃한 경우
        const userId = sessionStorage.getItem('uid');
        if (userId) {
          setIsLoggedIn(false);
          updateFirestoreUserStatus(userId, false);
        }
      }
    });
  }, []);

  const handleLogout = () => {
    const user = auth.currentUser;

    if (user) {
      const userId = sessionStorage.getItem('uid');
      if (userId) {
        // Firebase Auth에서 로그아웃
        auth.signOut();

        updateFirestoreUserStatus(userId, false);
        setIsLoggedIn(false);
      }
    }

    dispatch(logoutAction());
    sessionStorage.clear();
  };

  return (
    <header>
      <nav className="Header">
        <div className="header-container">
          <div className="pageList">
            <div className="logo">
              <Link to="/">
                {' '}
                <img src={logo} alt="Logo" />
              </Link>
            </div>
            <Link
              to="/"
              className={`page ${location.pathname === '/' ? 'active' : ''}`}
            >
              메인
            </Link>
            <Link
              to="/wiki"
              className={`page ${
                location.pathname === '/wiki' ? 'active' : ''
              }`}
            >
              위키
            </Link>
            <Link
              to="/gallery"
              className={`page ${
                location.pathname === '/gallery' ? 'active' : ''
              }`}
            >
              갤러리
            </Link>
            <Link
              to="/study"
              className={`page ${
                location.pathname === '/study' ? 'active' : ''
              }`}
            >
              스터디
            </Link>
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
        </div>
      </nav>
    </header>
  );
}
