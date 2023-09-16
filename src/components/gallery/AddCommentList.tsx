import React, { useState, useEffect } from 'react';
//import { getCommentList } from '../../data/galleryComment';

interface Props {
  imgId: string;
  categoryId: string;
  commentsListData?: string[];
}

type Comment = {
  comments: any;
};

const initialData: Comment = {
  comments: '댓글',
};

export function AddCommentList({ imgId, categoryId, commentsListData }: Props) {
  //const commentData = getCommentList(imgId, categoryId);
  //const commentData: any = commentsListData;
  const [commentDataInfo, setCommentDataInfo]: any =
    useState<Comment>(initialData);

  // React.useEffect(() => {
  //   commentData.then((item: any) => {
  //     setCommentDataInfo(item.data());
  //   });
  // }, []);

  // React.useEffect(() => {
  //   commentData.then((item: string) => {
  //     setCommentDataInfo(item);
  //   });
  // }, []);

  return (
    <ul>
      <li>댓글 넣기</li>
      {/* {commentDataInfo?.map((comment: any) => {
        <li>{comment}</li>;
      })} */}
    </ul>
  );
}
