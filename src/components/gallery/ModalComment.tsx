import {
  updateLike,
  uploadCommentList,
  uploadCommentList2,
} from 'data/galleryComment';
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCommentList } from './AddCommentList';
import { deleteImage, getImageData } from 'data/galleryImage';
import { userId } from 'pages/Gallery';

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

  //댓글 저장
  const handleComments = (e: any) => {
    setComment(e.target.value);
  };

  //submit 후 DB 저장
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (comment !== '') {
      const newCommentList: any = [...commentList, comment];
      setCommentList(newCommentList); //새 배열에 comment저장 후 set
      //uploadCommentList2(commentList, imgId, categoryId); //DB에 배열저장

      alert('Success! 저장에 성공했습니다.');
    } else if (comment == '') {
      alert(' Fail! 입력칸에 내용을  입력해주세요.');
    }
    //location.reload();
    setComment('');
  };

  // 이미지 게시글 삭제 버튼
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

  async function handleLike(e: any) {
    e.preventDefault();
    setLike(like + 1);

    console.log(like);
  }
  //like DB 저장
  useEffect(() => {
    updateLike(imgId, categoryId, like);
  }, [like]);

  // 초기값 지정
  useEffect(() => {
    setLike(Number(likeData));
    setCommentList(commentsListData);
  }, []);

  //실시간업데이트
  useEffect(() => {
    //uploadCommentList(imgId, categoryId, comment);
    uploadCommentList2(commentList, imgId, categoryId);
    console.log('여기는 useEffect', commentList);
  }, [commentList]);

  return (
    <div>
      <div className="header">
        <h2>{categoryId}</h2>
        <h3>작성자 {writerName}</h3>
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
          <label htmlFor="comment">write a comment</label>
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
          {commentList.map((comment: any) => {
            return <li key={comment.id}>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
