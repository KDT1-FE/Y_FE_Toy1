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
}
// Modal 댓글창

export function ModalComment({
  image,
  imgId,
  categoryId,
  commentsListData,
}: Props) {
  const navigate = useNavigate();
  const [like, setLike] = useState(0);
  const [comment, setComment]: any = useState();
  const [commentList, setCommentList] = useState(['테스트입니다.']);

  // const commentData: any = Promise.resolve(commentsListData);
  // const [commentDataInfo, setCommentDataInfo]: any = useState([]);

  const handleComments = (e: any) => {
    setComment(e.target.value);
  };

  //submit 후 DB 저장
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const newCommentList: any = [...commentList, comment];
    await setCommentList(newCommentList);
    await uploadCommentList(commentList, imgId, categoryId);
    await alert('저장에 성공했습니다.' + imgId);
    //await location.reload();
    setComment('');
  };

  // React.useEffect(() => {
  //   const data = getImageData(categoryId);
  //   data.then((item: any) => {
  //     setCommentDataInfo(item);
  //   });
  // }, [categoryId]);

  // console.log('코멘트 데이타', commentDataInfo);

  return (
    <div>
      <h2>{categoryId}</h2>
      <h3>자유롭게 대화해 보세요!</h3>

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
            value={comment || ''}
            onChange={handleComments}
          />
          <button type="submit">제출</button>
        </form>

        {/* <ul>
          <li>댓글 넣기</li>
          {commentDataInfo?.map((comment: any) => (
            <li key={comment.index}>{comment}</li>
          ))}
        </ul> */}

        <ul>
          <li>{commentsListData}</li>
          {/* {commentsListTwo?.map((comment: any) => {
            <li>{comment}</li>;
          })} */}
        </ul>
        {/* <AddCommentList 
          imgId={imgId}
          categoryId={categoryId}
          commentsListData={commentsListData}
        />*/}
      </div>
    </div>
  );
}
