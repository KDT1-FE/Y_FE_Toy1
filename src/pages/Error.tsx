import * as React from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';
import '../styles/pages/Error.scss';

interface IRouteError {
  status: number;
  statusText: string;
}

export function Error() {
  const error = useRouteError();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className="status-container">
      <p className="status">
        {(error as IRouteError).status}&nbsp;
        <span className="status-text">{(error as IRouteError).statusText}</span>
      </p>
      <p className="message">
        페이지를 불러오는 것에 실패했습니다. <br />
        죄송합니다. 요청하신 페이지가 존재하지 않거나, 서비스가 종료되었어요
        :&#40;
      </p>
      <button onClick={handleClick} className="btn" type="button">
        홈페이지로 돌아가기
      </button>
    </div>
  );
}
