import { db } from './firebase';
import {
  doc,
  setDoc,
  updateDoc,
  getDoc,
  getDocs,
  arrayUnion,
  Timestamp,
  collection,
  query,
  where,
} from 'firebase/firestore';
import { userId, userNickname } from 'pages/Gallery';

// 댓글 업로드
//리스트 통째로 바꾸기
const uploadCommentList2 = (data, imgId, categoryId) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: data,
  });
};

//새로 수정해보기
//댓글별 객체, 유저 넣기
const uploadCommentList = (imgId, categoryId, comment) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: [
      {
        commentUid: userId,
        commentUser: userNickname,
        text: comment,
        commentsTime: new Date(),
      },
    ],
  });
};

// like 업데이트
const updateLike = (imgId, categoryId, like) => {
  const likeRef = doc(db, categoryId, imgId);
  updateDoc(likeRef, {
    like: like,
  });
};
export { uploadCommentList2, uploadCommentList, updateLike };
