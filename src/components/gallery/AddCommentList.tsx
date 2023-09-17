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

// export function AddCommentList3 ({ commentsListData }: Props) {
//   //const commentData = getCommentList(imgId, categoryId);
//   //const commentData: any = commentsData;

//   // React.useEffect(() => {
//   //   setCommentList(commentsData)
//   // }, []);

//   // React.useEffect(() => {
//   //   commentData.then((item: string) => {
//   //     setCommentDataInfo(item);
//   //   });
//   // }, []);

//   return (
//     <ul>
//       <li>댓글 넣기</li>
//       {/* {commentDataInfo?.map((comment: any) => {
//         <li>{comment}</li>;
//       })} */}
//     </ul>
//   );
// }

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

  return <></>;
}
