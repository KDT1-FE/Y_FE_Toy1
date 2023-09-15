
import * as React from 'react';
import {readBoardData} from '../../data/wikiboard'
import {useState,ReactNode} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { useNavigate } from 'react-router-dom';
import './BoardContent.scss'
// export interface IAppProps {

// }
type Post = {
  name:string,
  title:string,
  time:string,
  content:string,
  id:string,
}


export function BoardContent ({boardState}:any) {
  const [boardData,setboardData] = useState<Post[]>([])
  const navigate = useNavigate()

  const handleClickBoard = (event:any)=>{
    const selectId = event.currentTarget.querySelector('.post__id')?.innerHTML;
    if (boardState == 'QA'){
      navigate(`/wiki/QABoard/${selectId}`)
    }
    else if (boardState == 'Free'){
      navigate(`/wiki/FreeBoard/${selectId}`)
    }
    else if (boardState == 'Best'){
      navigate(`/wiki/BestBoard/${selectId}`)
    }
    else {return }
  }
  
  const handledleClickButton = ()=>{
    if (boardState == 'QA'){
      navigate(`/wiki/question/new`)
    }
    else if (boardState == 'Free'){
      navigate(`/wiki/free/new`)
    }
    else if (boardState == 'Best'){
      navigate(`/wiki/best/new`)
    }
    else {return }
  }
  
  React.useEffect(()=>{
    const data = readBoardData(boardState)
    data.then((item:any)=>{
      setboardData(item)
    })
  },[boardState])


  return (
    <div>
      <button onClick={handledleClickButton}>작성하기</button>
      {boardData.map((item,index)=>
      <article key={index} className="post" onClick={handleClickBoard}>
        <div className="post__info">
          <span className='post__name'>{item.name}</span>
          <span className='post__time'>{item.time}</span>
        </div>
        <h1 className="post__title">{item.title}</h1>
        <p className="post__content">{textLengthOverCut(item.content,50,'...')}</p>
        <div className="post__id" style={{display:'none'}}>{item.id}</div>
      </article>
      )}
    </div>
  );
}

function textLengthOverCut(txt='lorem is', len=50, lastTxt='...'):string {

  if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}
