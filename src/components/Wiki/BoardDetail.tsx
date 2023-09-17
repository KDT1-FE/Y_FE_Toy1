import * as React from 'react';
import { useState } from 'react';
import './BoardDetail.scss';
import { readPostData, updatePostData } from 'data/wikiboard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import MdEditor from '@uiw/react-md-editor';
import { selectUserData } from 'data/getUser';
type Board = {
  name: string;
  content: string;
  time: string;
  title: string;
  uid: string;
  comment: any;
};

const initialData: Board = {
  name: '작성자',
  content: '본문내용',
  time: '15:23',
  title: '글제목',
  uid: 'string',
  comment: [{}],
};

export function BoardDetail(props: any) {
  const { id, boardState } = useParams();
  const navigate = useNavigate();
  const [commentContent, setCommentContent] = useState('');
  const [boardInfo, setBoardInfo] = useState<Board>(initialData);
  const itemData = readPostData(boardState, id);
  const [isChange,setChange] = useState(true);

  
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const now = moment();
    const formattedDate = now.format('YY-MM-DD HH:mm');
    const userData = await selectUserData(sessionStorage.user);
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
          uid: sessionStorage.user,
          nickname: nickName,
        },
      ],
    };
    await updatePostData(boardState, id, updateData);
    setChange(prev=>!prev)
    setCommentContent('')
  };

  const handleEditConfirm = async (e: any) => {
    const modifyCommentId = e.target
      .closest('.comment')
      .querySelector('.info__hide')
      .innerHTML;

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
            time:comment.time + '(수정 됨)'
          };
        } else {
          return comment
        }
      }),
    };
    
    await updatePostData(boardState,id,updateData);
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

      const input = e.target
      .closest('.comment')
      .querySelector('.input--mod');

      const prevCommentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content').innerHTML;

      
    input.value = prevCommentContent
    
    commentContent.classList.add('hide');
    editBox.classList.remove('hide');
  };

  const handleCancelEdit = (e:any) => {
    const editBox = e.target
      .closest('.comment')
      .querySelector('.input__edit__box');

      const commentContent = e.target
      .closest('.comment')
      .querySelector('.comment__content__box');

    editBox.classList.add('hide');
    commentContent.classList.remove('hide');
  }

  const handleDeleteComment = async (e:any ) =>{
    const result = confirm("작업을 진행하시겠습니까?");
    if (!result){
      return;
    }
    else {
      const modifyCommentId = e.target
      .closest('.comment')
      .querySelector('.info__hide')
      .innerHTML;

      const updateData = {
        ...boardInfo,
        comment: boardInfo.comment.filter((comment:any)=>comment.id != modifyCommentId)
      };
      await updatePostData(boardState,id,updateData);
      setChange(prev=>!prev)
      
      

    }
  }

  React.useEffect(() => {
    itemData.then((item: any) => {
      setBoardInfo(item.data());
    });
  }, [isChange]);

  return (
    <div className="board">
      <div className="board__header">
        <div className="board__profile">
          <p className="profile__name">{boardInfo.name}</p>
          <p className="profile__time">{boardInfo.time}</p>
        </div>
        {boardInfo.uid === sessionStorage.user && (
          <Link to="./edit">
            <p>글 수정하기</p>
          </Link>
        )}
      </div>
      <div>
        <h1 className="board__title">{boardInfo.title}</h1>
        <MdEditor.Markdown
          className="board__content"
          source={boardInfo.content}
          data-color-mode="light"
        />
      </div>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="여러분의 생각을 자유롭게 달아주세요."
          value={commentContent}
          onChange={(e) => {
            setCommentContent(e.target.value);
          }}
        />
        <button type="submit">댓글 쓰기</button>
      </form>
      {boardInfo.comment.map((commentData: any, index: number) => (
        <div key={index} className="comment">
          <div className="comment__header">
            <div className="profile">
              <img src="#" alt="유저 이미지" />
              <div className="user__data">
                <p>{commentData.nickname}</p>
                <p>{commentData.time}</p>
              </div>
            </div>
            <div className="comment__content__box">
              <p className="comment__content">{commentData.content}</p>
              {commentData.uid === sessionStorage.user && (
              <div className='comment__state__box'>
                <button onClick={handleClickModify}>수정</button>
                <button onClick={handleDeleteComment}>삭제</button>
              </div>
            )}
            </div>
            
            <div className='input__edit__box hide'>
              <input 
                type="text"
                className="input--mod"
                
              />
              <button onClick={handleEditConfirm}>수정</button>
              <button onClick={handleCancelEdit}>취소</button>
            </div>
            <p className="info__hide">{commentData.id}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
