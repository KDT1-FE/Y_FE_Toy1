import { db } from './firebase';
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from 'firebase/firestore';
import { userId, userNickname } from 'pages/Gallery';

//리스트 통째로 바꾸기
const uploadCommentList2 = (data, imgId, categoryId) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: data,
  });
};

// 댓글 업로드
//댓글별 객체, 유저 넣기
const uploadCommentList = (imgId, categoryId, comment) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: arrayUnion({
      commentUid: userId,
      commentUser: userNickname,
      text: comment,
      commentsTime: new Date(),
    }),
  });
};

const realtimeCommentList = (imgId, categoryId) => {
  onSnapshot(doc(db, categoryId, imgId), (querySnapshot) => {
    const contentArray = [];
    querySnapshot.forEach((doc) => {
      console.log('Current data: ', doc.data().comments);
      contentArray.push({
        comments: doc.data().comments,
      });
    });
    return contentArray;
  });
};

// like 업데이트
const updateLike = (imgId, categoryId, like) => {
  const likeRef = doc(db, categoryId, imgId);
  updateDoc(likeRef, {
    like: like,
  });
};
export {
  uploadCommentList2,
  uploadCommentList,
  realtimeCommentList,
  updateLike,
};
