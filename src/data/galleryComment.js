import { db } from './firebase';
import { doc, updateDoc, arrayUnion } from 'firebase/firestore';

//리스트 통째로 바꾸기
const uploadCommentWholeList = (data, imgId, categoryId) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: data,
  });
};

// 댓글 업로드
//댓글별 객체, 유저 넣기
const uploadCommentList = (
  imgId,
  categoryId,
  comment,
  uid,
  userName,
  userImage,
) => {
  const commentRef = doc(db, categoryId, imgId);
  updateDoc(commentRef, {
    comments: arrayUnion({
      commentUid: uid,
      commentUser: userName,
      text: comment,
      userImage: userImage,
      commentsTime: new Date(),
    }),
  });
};

// like 업데이트
const updateLike = (imgId, categoryId, like) => {
  const likeRef = doc(db, categoryId, imgId);
  updateDoc(likeRef, {
    like: like,
  });
};
export { uploadCommentWholeList, uploadCommentList, updateLike };
