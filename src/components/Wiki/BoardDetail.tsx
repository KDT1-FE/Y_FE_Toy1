import * as React from 'react';
import { useState } from 'react';
import './BoardDetail.scss';
import { readPostData, updatePostData } from 'data/wikiboard';
import { Link, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment';
import MdEditor from '@uiw/react-md-editor';
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
  const navigate = useNavigate()
  const [commentContent,setCommentContent] = useState('');
  const params = useParams();
  const [boardInfo, setBoardInfo] = useState<Board>(initialData);
  const itemData = readPostData(boardState, id);
  
  const handleSubmit = async (e:any)=>{
    e.preventDefault()
    const now = moment();
    const formattedDate = now.format('YY-MM-DD HH:mm');
    const updateData = {...boardInfo,comment:[...boardInfo.comment,
      {
        content:commentContent,
        time:formattedDate,
        uid:sessionStorage.user,
        nickname:'경규'
      }]}
    await updatePostData(boardState,id,updateData)
    navigate('./')
  }

  React.useEffect(() => {
    itemData.then((item: any) => {
      setBoardInfo(item.data());
    });
  }, []);


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
        <MdEditor.Markdown className="board__content" source={boardInfo.content} data-color-mode="light"/>
      </div>
      <form onSubmit={handleSubmit}>
        <input required type="text" placeholder="여러분의 생각을 자유롭게 달아주세요." value={commentContent} onChange={(e)=>{
          setCommentContent(e.target.value)
        }}/>
        <button type="submit">댓글 쓰기</button>
      </form>
      {boardInfo.comment.map((commentData: any) => (
        <div key={commentData.uid} className="comment">
          <div className="comment__header">
            <div className="profile">
              <img src="#" alt="user__profile" />
              <div className="user__data">
                <p>{commentData.nickname}</p>
                <p>{commentData.time}</p>
              </div>
            </div>
            {commentData.uid === sessionStorage.user && 
            <div>
              <button>수정</button>
              <button>삭제</button>
            </div>
            }
          </div>
          <div className='comment__content'><p>
            {commentData.content}</p></div>
        </div>
      ))}
    </div>
  );
}
