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

const uploadCommentList = (data, imgId, categoryId) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: data,
  });
};

//새로 수정해보기
// const uploadCommentList2 = (data, imgId, categoryId) => {
//   const commentRef = doc(db, categoryId, imgId);
//   updateDoc(commentRef, {
//     comments: data,
//   });
// };

// like 업데이트
const updateLike = (imgId, categoryId, like) => {
  const likeRef = doc(db, categoryId, imgId);
  updateDoc(likeRef, {
    like: like,
  });
};
export { uploadCommentList, updateLike };
