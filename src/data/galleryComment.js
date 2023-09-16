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

export { uploadCommentList };

// 댓글 다운로드
// export async function getCommentList(imgId, categoryId) {
//   const querySnapshot = await getDoc(doc(db, categoryId, imgId));
//   let commentsData = [];
//   try {
//     querySnapshot.forEach((doc) => {
//       commentsData.push({
//         comments: doc.data().comments,
//       });
//     });
//     return commentsData;
//   } catch (error) {
//     console.error();
//   }
//   return;
// }
