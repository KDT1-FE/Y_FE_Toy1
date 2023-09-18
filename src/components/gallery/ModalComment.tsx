import { db } from 'data/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import './ModalComment.scss';
import {
  updateLike,
  uploadCommentList,
  uploadCommentWholeList,
} from 'data/galleryComment';
import { deleteImage } from 'data/galleryImage';
import { userId, userNickname } from 'pages/Gallery';

interface Props {
  image: string;
  imgId: string;
  categoryId: string;
  commentsListData?: string[];
  writerId: string;
  writerName: string;
  likeData: string;
}

export function ModalComment({
  writerId,
  writerName,
  image,
  imgId,
  categoryId,
  commentsListData,
  likeData,
}: Props) {
  const [like, setLike] = useState(0);
  const [comment, setComment]: any = useState('');
  const [commentList, setCommentList]: any = useState([]);
  const [isChange, setChange]: any = useState(true);

  //like
  async function handleLike(e: any) {
    e.preventDefault();
    setLike(like + 1);
  }

  //like DB 저장
  useEffect(() => {
    updateLike(imgId, categoryId, like);
  }, [like]);

  // 이미지 게시글 삭제
  async function handleDeleteImage(e: any) {
    e.preventDefault();
    if (writerId == userId) {
      await deleteImage(categoryId, imgId);
      alert('삭제에 성공했습니다.');
      location.reload();
    } else {
      alert('삭제 권한이 없습니다.');
    }
  }

  //댓글 저장
  const handleComments = (e: any) => {
    setComment(e.target.value);
  };

  //submit 후 DB 저장
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (comment !== '') {
      const newCommentList: any = [...commentList, comment];
      await setCommentList(newCommentList); //새 배열에 comment저장 후 set
      await uploadCommentList(imgId, categoryId, comment); //댓글 업로드
      alert('Success! 저장에 성공했습니다.');
      await setChange((prev: any) => !prev);
    } else if (comment == '') {
      alert(' Fail! 입력칸에 내용을  입력해주세요.');
    }
  };

  //실시간 댓글리스트 업데이트 함수
  function getRealTimeCommentList() {
    const fetchList = async (categoryId: any, imgId: any) => {
      // ... try, catch 생략
      const commentsRef = doc(db, categoryId, imgId);
      const unsub = onSnapshot(commentsRef, (doc: any) => {
        setCommentList(doc.data().comments);
      });
      return unsub;
    };
    return fetchList(categoryId, imgId);
  }

  //실시간 댓글리스트 업데이트
  useEffect((): any => {
    if (comment !== '') {
      getRealTimeCommentList(); //실시간 가져오기
    }
    setComment('');
    console.log('Changed!', isChange);
  }, [isChange, doc, onSnapshot]);

  // 댓글 삭제
  const handleDeleteComment = async (e: any) => {
    try {
      //선택 text값
      const getDelText: string = e.target.previousElementSibling.innerHTML;
      const getDelUid: string = e.target.closest('.commentItem').id;
      //filter
      const updatedData = commentList.filter((comment: any) => {
        // text 내용 같은 요소만 제거
        return (
          comment.text !== getDelText.trim() &&
          comment.commentUid == getDelUid.trim()
        );
      });
      await setCommentList(updatedData);
      //배열 형태로 db업로드
      await uploadCommentWholeList(updatedData, imgId, categoryId);
      await setChange((prev: any) => !prev);
      console.log('Deleted Comment Text:', updatedData);
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  // 초기값 지정
  useEffect(() => {
    setLike(Number(likeData));
    setCommentList(commentsListData);
  }, []);

  return (
    <div>
      <div className="header">
        <h2>!</h2>
        <h3>작성자 : {writerName}</h3>

        {userNickname === writerName ? (
          <button className="btn--delImage" onClick={handleDeleteImage}>
            이미지 게시글 삭제
          </button>
        ) : null}
      </div>

      <div className="imageView">
        <img src={image} alt={image} />
        <h3>
          <span onClick={handleLike}>💖</span>
          {like}
        </h3>
      </div>

      <div className="commentContainer">
        {userNickname ? (
          <form onSubmit={handleSubmit} className="commentForm">
            <label htmlFor="comment"></label>
            <input
              type="text"
              id="comment"
              placeholder="작성 후 수정이 안되니 잘 생각하고 남기도록✏"
              value={comment}
              onChange={handleComments}
            />
            <button type="submit">제출</button>
          </form>
        ) : (
          <h2>댓글 작성을 위해 로그인이 필요합니다.</h2>
        )}

        <ul>
          {commentList?.map((comment: any) => (
            <li
              key={comment.commentsTime}
              id={comment.commentUid}
              className="commentItem"
            >
              <h3>{comment.commentUser}</h3>
              <span className="commentText">{comment.text} </span>
              {userNickname === comment.commentUser ? (
                <span className="btn--delComment" onClick={handleDeleteComment}>
                  🗑
                </span>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
