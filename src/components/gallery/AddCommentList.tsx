import React, { useState, useEffect } from 'react';
import { userId, userNickname } from 'pages/Gallery';
import { uploadCommentList } from 'data/galleryComment';

interface Props {
  commentsListData?: string[];
  comment: string;
  imgId?: string;
  categoryId?: string;
  commentList: any;
  setCommentList: any;
}

type Comment = {
  comments: any;
};

const initialData: Comment = {
  comments: '댓글',
};

export function AddCommentList({
  commentsListData,
  comment,
  imgId,
  categoryId,
  commentList,
  setCommentList,
}: Props) {
  //초기값
  // useEffect(() => {
  //   setCommentList(commentsListData);
  // }, []);

  // //실시간업데이트
  // useEffect(() => {
  //   uploadCommentList(imgId, categoryId, comment);
  // }, [commentList]);

  return (
    <>
      <ul>
        {commentList?.map((comment: any) => (
          <li key={comment.commentUid}>
            <h3>{comment.commentUser}</h3>
            <span>{comment.text}</span>
          </li>
        ))}
      </ul>
    </>
  );
}
