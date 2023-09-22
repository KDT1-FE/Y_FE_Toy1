import React from 'react';
import './NavBar.scss';
import { RootState } from 'redux/types';
import { useSelector } from 'react-redux';
import { AddImageModal } from './ModalAddImage';
import 'styles/_common.scss';

export function SideBarLink(): JSX.Element {
  const user = useSelector((state: RootState) => state);

  return (
    <div>
      <nav id="navbar-example2" className="navbar px-3 mb-3 gallNav">
        <a className="navbar-brand" href="#">
          갤러리
        </a>
        <ul className="nav nav-pills">
          <li className="nav-item">
            <a className="nav-link" href="#studyTips">
              공부꿀팁
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#events">
              이벤트
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#humors">
              유머
            </a>
          </li>
        </ul>
      </nav>

      {user.uid ? (
        <AddImageModal />
      ) : (
        <a className="notLoginInfo" href="/SignIn">
          이미지를 공유하고 싶다면 로그인을 해주세요!
        </a>
      )}
    </div>
  );
}
