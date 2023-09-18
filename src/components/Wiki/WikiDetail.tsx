import * as React from 'react';

import { BoardNav } from './BoardNav';
import { BoardDetail } from './BoardDetail';

export function WikiDetail(props: any) {
  return (
    <>
      <BoardNav />
      <BoardDetail />
    </>
  );
}
