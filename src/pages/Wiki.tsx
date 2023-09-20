import * as React from 'react';
import { BoardNav } from '../components/Wiki/BoardNav';
import { BoardContent } from '../components/Wiki/BoardContent';
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
