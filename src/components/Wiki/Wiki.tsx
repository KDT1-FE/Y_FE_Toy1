import * as React from 'react';
import { BoardNav } from './BoardNav';
import { BoardContent } from './BoardContent';
import {Provider,useSelector} from 'react-redux';
import Header from '../Header/Header'; 



export function Wiki (props: any) {
  const boardState = useSelector((state:any)=>state.boardState.value)
  
  return (
    <>
      <Header />
      <BoardNav />
      <BoardContent boardState={boardState} />
    </>
  );
}