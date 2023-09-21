import React from 'react';
import './BoardNav.scss';
import { useDispatch } from 'react-redux';
import { boardStateSlice } from 'redux/store';
import { useNavigate } from 'react-router-dom';

type BoardState = 'QA' | 'Free' | 'Best';

export function BoardNav(props: any) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBoardClick = (event: any): void => {
    const selectBoard: string = event.target.innerHTML;
    if (selectBoard === 'Q &amp; A') {
      dispatch(boardStateSlice.actions.qa('QA'));
      navigate(`/wiki`);
    } else if (selectBoard === '커뮤니티') {
      dispatch(boardStateSlice.actions.qa('Free'));
      navigate(`/wiki`);
    } else if (selectBoard === '지식 공유') {
      dispatch(boardStateSlice.actions.qa('Best'));
      navigate(`/wiki`);
    }
  };

  return (
    <nav id="navbar-example2" className="navbar bg-body-tertiary px-3 mb-3">
      <a className="navbar-brand" href="#">
        wiki
      </a>
      <ul className="nav nav-pills">
        <li className="nav-item">
          <a
            className="nav-link"
            href="#scrollspyHeading1"
            onClick={handleBoardClick}
          >
            Q & A
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#scrollspyHeading2"
            onClick={handleBoardClick}
          >
            커뮤니티
          </a>
        </li>
        <li className="nav-item">
          <a
            className="nav-link"
            href="#scrollspyHeading2"
            onClick={handleBoardClick}
          >
            지식 공유
          </a>
        </li>
      </ul>
    </nav>
  );
}
