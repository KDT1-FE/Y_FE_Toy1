import {
  realtimeCommentList,
  updateLike,
  uploadCommentList,
  uploadCommentList2,
} from 'data/galleryComment';
import { db } from 'data/firebase';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import React, { useState, useRef, useEffect } from 'react';
import './ModalComment.scss';
import { useNavigate } from 'react-router-dom';
import { AddCommentList } from './AddCommentList';
import { deleteImage, getImageData } from 'data/galleryImage';
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
// Modal 댓글창

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
      await deleteImage(categoryId, imgId, image);
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
      alert('Success! 저장에 성공했습니다.');
      await setChange((prev: any) => !prev);
      //location.reload();
    } else if (comment == '') {
      alert(' Fail! 입력칸에 내용을  입력해주세요.');
    }
  };

  function realtime() {
    const fetchList = async (categoryId: any, imgId: any) => {
      // ... try, catch 생략
      const userRef = doc(db, categoryId, imgId);
      const unsub = onSnapshot(userRef, (doc: any) => {
        console.log('Current comments: ', doc.data().comments);
        console.log('Current data: ', doc.data());
        setCommentList(doc.data().comments);
      });
      return unsub;
    };
    return fetchList(categoryId, imgId);
  }

  useEffect((): any => {
    if (comment !== '') {
      uploadCommentList(imgId, categoryId, comment);
      realtime();
    }
    setComment('');
  }, [isChange, doc, onSnapshot]);

  // 초기값 지정
  useEffect(() => {
    setLike(Number(likeData));
    setCommentList(commentsListData);
  }, []);

  return (
    <div>
      <div className="header">
        <h2>Close 버튼이 안먹혀요ㅠ Esc 키 눌러주세요!</h2>
        <h3>작성자 : {writerName}</h3>
        <button className="btn--delImage" onClick={handleDeleteImage}>
          이미지 게시글 삭제
        </button>
      </div>

      <div className="imageView">
        <img src={image} alt={image} />
        <h3>
          <span onClick={handleLike}>♥</span>
          {like}
        </h3>
      </div>

      <div className="commentContainer">
        <form onSubmit={handleSubmit} className="commentForm">
          <label htmlFor="comment">
            {userNickname ? userNickname : '로그인이 필요합니다.'}
          </label>
          <input
            type="text"
            id="comment"
            placeholder="작성 후 수정이 안되니 잘 생각하고 남기도록✏"
            value={comment}
            onChange={handleComments}
          />
          <button type="submit">제출</button>
        </form>

        <ul>
          {commentList?.map((comment: any) => (
            <li key={comment.commentsTime} className="commentItem">
              <h3>{comment.commentUser}</h3>
              <span className="commentText">{comment.text}</span>
            </li>
          ))}
        </ul>

        {/* <AddCommentList
          commentsListData={commentsListData}
          comment={comment}
          imgId={imgId}
          categoryId={categoryId}
          commentList={commentList}
          setCommentList={setCommentList}
        /> */}
      </div>
    </div>
  );
}
