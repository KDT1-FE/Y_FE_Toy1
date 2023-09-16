import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types'; // RootState 타입 추가
import { logoutAction } from '../../redux/action'; // 로그아웃 액션 임포트
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.png';

// ... 다른 import 코드 ...

export default function Header() {
  // useSelector를 통해 스토어의 유저 정보 읽어오기
  const user = useSelector((state: RootState) => state);

  // useDispatch를 통해 로그아웃 액션 디스패치 함수 가져오기
  const dispatch = useDispatch();

  // 로그아웃 핸들러
  const handleLogout = () => {
    // 로그아웃 액션 디스패치
    dispatch(logoutAction());
  };

  return (
    <header>
      <nav className="Header">
      <div className="header-container">
          <div className="pageList">
            <div className="logo">
              <Link to="/">
                {' '}
                {/* 로고에 메인 페이지로 이동하는 링크 추가 */}
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
            <div>
              <span>{user.nickname}님 환영해요!</span>
              <button onClick={handleLogout}>로그아웃</button>
            </div>
          ) : (
            // 사용자가 로그인하지 않은 경우
            <>
              <Link to="SignIn" className="auth-button1">
                로그인
              </Link>
              <Link to="/SignUp" className="auth-button2">
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
