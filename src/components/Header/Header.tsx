import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.png';

export default function Header() {
  const location = useLocation();

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
              <button className="auth-button1">로그인</button>
              <button className="auth-button2">회원가입</button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
