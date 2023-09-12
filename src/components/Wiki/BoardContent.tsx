import { log } from 'console';
import * as React from 'react';
import {readBoardData} from '../../data/wikiboard'
import {useState,ReactNode} from 'react'

import './BoardContent.scss'
// export interface IAppProps {

// }
type Post = {
  name:string,
  title:string,
  time:string,
  content:string,
}
export function BoardContent ({boardState}:any) {
  const [boardData,setboardData] = useState<Post[]>([])
  
  React.useEffect(()=>{
    const data = readBoardData(boardState)
    data.then((item:any)=>{
      setboardData(item)
    })
  },[boardState])

  
  return (
    <div>
      {boardData.map((item,index)=>
      <article key={index} className="post">
        <div className="post__info">
          <span className='post__name'>{item.name}</span>
          <span className='post__time'>{item.time}</span>
        </div>
        <h1 className="post__title">{item.title}</h1>
        <p className="post__content">{textLengthOverCut(item.content,50,'...')}</p>
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
