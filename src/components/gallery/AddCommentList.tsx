import React from 'react';

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
