import * as React from 'react';
import {useState} from 'react'
import './BoardDetail.scss'
import { readPostData } from 'data/wikiboard';
import { useParams } from 'react-router-dom';

type Board = {
    name:string,
    content:string,
    time:string,
    title:string
}

const initialData:Board = {name:'작성자',content:'본문내용',time:'15:23',title:'글제목'}

export function BoardDetail(props: any) {
    const {id,boardState} = useParams();
    const params = useParams()
    const [boardInfo,setBoardInfo] = useState<Board>(initialData)
    const itemData = readPostData(boardState,id)
    


    React.useEffect(()=>{
        itemData.then((item:any)=>{setBoardInfo(item.data())})
    },[])
    
    
  return (
    <div className="board">
      <div className="board__profile">
        <p className="profile__name">{boardInfo.name}</p>
        <p className="profile__time">{boardInfo.time}</p>
      </div>
      <div>
        <h1 className="board__title">{boardInfo.title}</h1>
        <p className='board__content'>{boardInfo.content}</p>
      </div>
      <form>
        <input type="text" placeholder="여러분의 생각을 자유롭게 달아주세요." />
        <button type="submit">댓글 쓰기</button>
      </form>
    </div>
  );
}
