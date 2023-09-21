import React, { useState } from 'react';
import './BoardDetail.scss';
import { deletePostData, readPostData, updatePostData } from 'data/wikiboard';
import { useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import MdEditor from '@uiw/react-md-editor';
import { selectUserData } from 'data/getUser';

interface IBoard {
  name: string;
  content: string;
  time: string;
  title: string;
  uid: string;
  comment: any;
  id: number;
}

const initialData: IBoard = {
  name: '...Loading',
  content: '...Loading',
  time: '...Loading',
  title: '...Loading',
  uid: '...Loading',
  id: 0,
  comment: [{}],
};

export function BoardDetail(props: any) {
  const { id, boardState } = useParams();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState('');
  const [boardInfo, setBoardInfo] = useState<IBoard>(initialData);
  const itemData = readPostData(boardState, id);
  const [isChange, setChange] = useState(true);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = moment();
    const formattedDate = now.format('YY-MM-DD HH:mm');
    const userData = await selectUserData(sessionStorage.uid);
    const nickName = userData?.nickname;
    const updateData = {
      ...boardInfo,
      comment: [
        ...boardInfo.comment,
        {
          id:
            boardInfo.comment.length !== 0
              ? boardInfo.comment[boardInfo.comment.length - 1].id + 1
              : 0,
          content: commentContent,
          time: formattedDate,
          uid: sessionStorage.uid,
          nickname: nickName,
        },
      ],
    };
    await updatePostData(boardState, id, updateData);
    setChange((prev) => !prev);
    setCommentContent('');
  };

  const handleEditConfirm = async (e: any) => {
    const modifyCommentId = e.target
      .closest('.comment')
      .querySelector('.info__hide').innerHTML;

    const editContent = e.target
      .closest('.comment')
      .querySelector('.input--mod');

    const content = e.target
      .closest('.comment')
      .querySelector('.comment__content');

    const commentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content__box');

    const editBox = e.target
      .closest('.comment')
      .querySelector('.input__edit__box');

    const updateData = {
      ...boardInfo,
      comment: boardInfo.comment.map((comment: any) => {
        if (comment.id == modifyCommentId) {
          return {
            ...comment,
            content: editContent.value,
            time: comment.time + '(수정 됨)',
          };
        } else {
          return comment;
        }
      }),
    };

    await updatePostData(boardState, id, updateData);
    content.innerHTML = editContent.value;

    editBox.classList.add('hide');
    commentContent.classList.remove('hide');
  };

  const handleClickModify = async (e: any) => {
    const commentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content__box');

    const editBox = e.target
      .closest('.comment')
      .querySelector('.input__edit__box');

    const input = e.target.closest('.comment').querySelector('.input--mod');

    const prevCommentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content').innerHTML;

    input.value = prevCommentContent;

    commentContent.classList.add('hide');
    editBox.classList.remove('hide');
  };

  const handleCancelEdit = (e: any) => {
    const editBox = e.target
      .closest('.comment')
      .querySelector('.input__edit__box');

    const commentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content__box');

    editBox.classList.add('hide');
    commentContent.classList.remove('hide');
  };

  const handleDeleteComment = async (e: any) => {
    const result = confirm('작업을 진행하시겠습니까?');
    if (!result) {
      return;
    } else {
      const modifyCommentId = e.target
        .closest('.comment')
        .querySelector('.info__hide').innerHTML;

      const updateData = {
        ...boardInfo,
        comment: boardInfo.comment.filter(
          (comment: any) => comment.id != modifyCommentId,
        ),
      };
      await updatePostData(boardState, id, updateData);
      setChange((prev) => !prev);
    }
  };

  const handleDelete = async () => {
    const deleteConfirm = confirm('삭제 하시겠습니까?');

    if (deleteConfirm && boardInfo.uid === sessionStorage.uid) {
      await deletePostData(boardState, boardInfo.id);
      navigate('/wiki');
    }
  };

  React.useEffect(() => {
    itemData.then((item: any) => {
      setBoardInfo(item.data());
    });
  }, [isChange]);

  return (
    <main className="container">
      <header className="py-5 text-center">
        <h1>{boardInfo.title}</h1>
      </header>

      <div className="row g-5">
        <section className="col-2 order-md-last">
          {boardInfo.uid === sessionStorage.uid && (
            <div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  navigate('./edit');
                }}
              >
                글 수정
              </button>

              <button className="btn btn-primary" onClick={handleDelete}>
                글 삭제
              </button>
            </div>
          )}
          <aside>
            <p>{boardInfo.name}</p>
            <p>
              <time dateTime="2022-01-01T00:00:00">{boardInfo.time}</time>
            </p>
          </aside>
        </section>

        <article id="article-content" className="col-10">
          <MdEditor.Markdown
            className="board__content"
            source={boardInfo.content}
            data-color-mode="light"
          />
        </article>
      </div>
      <div className="row 9-5">
        <section className="comment">
          <form className="row g-12" onSubmit={handleSubmit}>
            <div className="col-11">
              <label htmlFor="articleComment" hidden>
                댓글
              </label>
              <textarea
                value={commentContent}
                onChange={(e) => {
                  setCommentContent(e.target.value);
                }}
                className="form-control"
                id="articleComment"
                placeholder="댓글 쓰기.."
                rows={3}
                required
              ></textarea>
            </div>
            <div className="col-1">
              <label htmlFor="comment-submit" hidden>
                댓글 쓰기
              </label>
              <button
                className={`btn btn-primary ${
                  sessionStorage.uid ? '' : 'disabled'
                }`}
                id="comment-submit"
                type="submit"
              >
                쓰기
              </button>
            </div>
          </form>

          <ul id="article-comments" className="row col-12">
            {boardInfo.comment.map((commentData: any, index: number) => (
              <li key="index" className="comment">
                <div className="row">
                  <div className="row col-12">
                    <strong>{commentData.nickname}</strong>
                    <small>
                      <time>{commentData.time}</time>
                    </small>
                    <div className="comment__content__box">
                      <pre className="comment__content" >{commentData.content}</pre>
                      {commentData.uid === sessionStorage.uid && (
                        <div className="comment__state__box">
                          <button
                            className="btn btn-primary"
                            onClick={handleClickModify}
                          >
                            수정
                          </button>
                          <button
                            className="btn btn-primary"
                            onClick={handleDeleteComment}
                          >
                            삭제
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="input__edit__box hide">
                  <input
                    type="text"
                    className="form-control input--mod"
                    id="exampleFormControlInput1"
                  />
                  <button
                    className="btn btn-primary"
                    onClick={handleEditConfirm}
                  >
                    수정
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={handleCancelEdit}
                  >
                    취소
                  </button>
                  <p className="info__hide">{commentData.id}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
