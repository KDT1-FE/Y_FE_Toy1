import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/types'; // RootState 타입 추가
import { logoutAction } from '../../redux/action'; // 로그아웃 액션 임포트
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.png';

export default function Header() {
  // useSelector를 통해 스토어의 유저 정보 읽어오기
  const user = useSelector((state: RootState) => state);

  // useDispatch를 통해 로그아웃 액션 디스패치 함수 가져오기
  const dispatch = useDispatch();

  /// Redux 스토어에 로그아웃 액션을 디스패치한 후 세션 스토리지 업데이트
  const handleLogout = () => {
  // 로그아웃 액션 디스패치
  dispatch(logoutAction());

  // 세션 스토리지 업데이트
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
            <div className='userInfo-container'>
              <div className='userNickname-container'>
                <span className='userNickname'>{user.nickname}님</span>
                <span className='userWelcome'>환영해요!</span>
              </div>
              <button className='logoutBtn' onClick={handleLogout}>로그아웃</button>
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
