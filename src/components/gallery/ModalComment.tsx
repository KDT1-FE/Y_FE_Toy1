import React, { useState } from 'react';

interface ICommentProps {
  image: string;
}

// Modal로 오픈 된 댓글창입니다

export function ModalComment({ image }: ICommentProps) {
  const [like, setLike] = useState(0);

  return (
    <div>
      <h3>자유롭게 대화해 보세요!</h3>

      <div className="imageView">
        <img src={image} alt={image} />
        <h3>
          <span onClick={() => setLike(like + 1)}>♥</span>
          {like}
        </h3>
      </div>
      <div className="commentContainer">
        <div className="commentForm">
          <label htmlFor="comment">write a comment</label>
          <input
            type="text"
            name="comment"
            id="comment"
            placeholder="이미지에 대한 생각을 자유롭게 작성해주세요✏"
          />
        </div>
        <ul className="commentList">
          <li className="comment"></li>
        </ul>
      </div>
    </div>
  );
}

//인풋 받아서 댓글 추가 예정
export function CommentList() {
  return <div>으아악</div>;
}
