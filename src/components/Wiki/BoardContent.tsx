import { log } from 'console';
import * as React from 'react';
import {readBoardData} from '../../data/wikiboard'
import {useState,ReactNode} from 'react'
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
  },[])
  console.log(boardData)

  
  return (
    <div>
      {boardData.map((item,index)=>
      <article key={index}>
        <div>
          <span>{item.name}</span>
          <span>{item.time}</span>
        </div>
        <h1>{item.title}</h1>
        <p>{textLengthOverCut(item.content,50,'...')}</p>
      </article>
      )}
    </div>
  );
}

function textLengthOverCut(txt:string, len=50, lastTxt='...'):string {

  if (txt.length > len) {
      txt = txt.substr(0, len) + lastTxt;
  }
  return txt;
}
