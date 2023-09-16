import { uploadCommentList } from 'data/galleryComment';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AddCommentList } from './AddCommentList';
import { getImageData } from 'data/galleryImage';

interface Props {
  image: string;
  imgId: string;
  categoryId: string;
  commentsListData?: string[];
  userId: string;
  nickName: string;
}
// Modal 댓글창

export function ModalComment({
  userId,
  nickName,
  image,
  imgId,
  categoryId,
  commentsListData,
}: Props) {
  const navigate = useNavigate();
  const [like, setLike] = useState(0);
  const [comment, setComment]: any = useState();
  const [commentList, setCommentList] = useState(['테스트입니다.']);

  const handleComments = (e: any) => {
    setComment(e.target.value);
  };

  //submit 후 DB 저장
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (comment !== '') {
      const newCommentList: any = [...commentList, comment];
      setCommentList(newCommentList); //새 배열에 comment저장 후 set
      uploadCommentList(commentList, imgId, categoryId); //DB에 배열저장
      alert('Success! 저장에 성공했습니다.');
    } else if (comment == '') {
      alert(' Fail! 입력칸에 내용을  입력해주세요.');
    }
    //location.reload();
    setComment('');
    console.log('현재 입력 제출된 comment 값 : ', comment);
    console.log('현재 DB에 저장되어 있는 commentList 값 : ', commentList);
  };

  return (
    <div>
      <h2>{categoryId}</h2>
      <h3>작성자 {nickName}</h3>

      <div className="imageView">
        <img src={image} alt={image} />
        <h3>
          <span onClick={() => setLike(like + 1)}>♥</span>
          {like}
        </h3>
      </div>

      <div className="commentContainer">
        <form onSubmit={handleSubmit} className="commentForm">
          <label htmlFor="comment">write a comment</label>
          <input
            type="text"
            id="comment"
            placeholder="이미지에 대한 생각을 자유롭게 작성해주세요✏"
            value={comment}
            onChange={handleComments}
          />
          <button type="submit">제출</button>
        </form>

        <ul>
          {commentsListData?.map((comment: any) => {
            return <li key={comment.id}>{comment}</li>;
          })}
        </ul>
      </div>
    </div>
  );
}
