import * as React from 'react';
import { useParams } from 'react-router-dom';
import { BoardNav } from './BoardNav';
import { BoardDetail } from './BoardDetail';

export function WikiDetail (props: any) {
    const params = useParams()
    console.log(params)
  return (
    <>
    <BoardNav />
    <BoardDetail />
    </>
  );
}
