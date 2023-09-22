import React, { useState, useEffect } from 'react';
import { readBoardData } from '../../data/wikiboard';
import { useNavigate } from 'react-router-dom';
import './BoardContent.scss';

interface IPost {
  name: string;
  title: string;
  time: string;
  content: string;
  id: string;
}

export function BoardContent({ boardState }: any) {
  const [boardData, setboardData] = useState<IPost[]>([]);
  const navigate = useNavigate();

  const handleClickBoard = (event: any) => {
    const selectId = event.currentTarget.querySelector('.post__id')?.innerHTML;
    if (boardState == 'QA') {
      navigate(`/wiki/QABoard/${selectId}`);
    } else if (boardState == 'Free') {
      navigate(`/wiki/FreeBoard/${selectId}`);
    } else if (boardState == 'Best') {
      navigate(`/wiki/BestBoard/${selectId}`);
    } else {
      return;
    }
  };

  const handledleClickButton = () => {
    if (boardState == 'QA') {
      navigate(`/wiki/question/new`);
    } else if (boardState == 'Free') {
      navigate(`/wiki/free/new`);
    } else if (boardState == 'Best') {
      navigate(`/wiki/best/new`);
    } else {
      return;
    }
  };

  useEffect(() => {
    const data = readBoardData(boardState);
    data.then((item: any) => {
      setboardData(item.reverse());
    });
  }, [boardState, sessionStorage.uid]);

  return (
    <div className="board__content">
      {sessionStorage.uid && (
        <button onClick={handledleClickButton} className="btn btn-secondary">
          작성하기
        </button>
      )}
      <table className="table table-hover" id="article-table">
        <thead>
          <tr>
            <th className="title col-8">
              <a>제목</a>
            </th>
            <th className="user-id">
              <a>작성자</a>
            </th>
            <th className="created-at">
              <a>작성일</a>
            </th>
          </tr>
        </thead>
        <tbody>
          {boardData.map((item, index) => (
            <tr key={index} onClick={handleClickBoard}>
              <td className="title">
                <a>{item.title}</a>
              </td>
              <td className="user-id">{item.name}</td>
              <td className="created-at">
                <time>{item.time}</time>
              </td>
              <td>
                <div className="post__id" style={{ display: 'none' }}>
                  {item.id}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <nav aria-label="Page navigation example " id="pagination ">
        <ul className="pagination justify-content-center">
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
              <span aria-hidden="true">&laquo;</span>
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#">
              1
            </a>
          </li>
          <li className="page-item">
            <a className="page-link disabled" href="#">
              2
            </a>
          </li>
          <li className="page-item">
            <a className="page-link disabled" href="#">
              3
            </a>
          </li>
          <li className="page-item">
            <a className="page-link disabled" href="#">
              4
            </a>
          </li>
          <li className="page-item">
            <a className="page-link disabled" href="#">
              5
            </a>
          </li>
          <li className="page-item">
            <a className="page-link disabled" href="#">
              ...
            </a>
          </li>
          <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
