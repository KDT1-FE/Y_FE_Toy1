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

// 댓글 업로드

const uploadCommentList = (data, imgId, categoryId) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: data,
  });
};

// 댓글 다운로드
export async function getCommentList(imgId, categoryId) {
  const querySnapshot = await getDoc(doc(db, categoryId, imgId));
  let commentsData = [];
  try {
    querySnapshot.forEach((doc) => {
      commentsData.push({
        comments: doc.data().comments,
      });
    });
    return commentsData;
  } catch (error) {
    console.error();
  }
  return;
}

export { uploadCommentList };

// const getCommentList = (imgId) => {
//   getDoc(doc(db, 'Comment', imgId));
// };

// console.log('getCommentList = ' + getCommentList);
// export { getCommentList };

// const getDocumentsAsObjects = (querySnapshot) => {
//   const doc = [];
//   querySnapshot.forEach((doc) => {
//     const comments = doc.data();
//     doc.push({
//       comments,
//     });
//   });
//   return doc;
// };

// export const getCommentList = getDocumentsAsObjects(querySnapshot);

// export async function getCommentList(imgId) {
//   const querySnapshot = await getDoc(doc(db, 'Comment', imgId));

//   const getDocumentsAsObjects = (querySnapshot) => {
//     const doc = [];
//     querySnapshot.forEach((doc) => {
//       const comments = doc.data();
//       doc.push({
//         comments,
//       });
//     });
//     return doc;
//   };
//   return getDocumentsAsObjects;
// }
