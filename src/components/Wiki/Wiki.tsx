import * as React from 'react';
import { BoardNav } from './BoardNav';
import { BoardContent } from './BoardContent';
import { useSelector } from 'react-redux';

export function Wiki(props: any) {
  const boardState = useSelector((state: any) => state.boardState.value);

  return (
    <>
      <BoardNav />
      <BoardContent boardState={boardState} />
    </>
  );
}
