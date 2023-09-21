import { db } from 'data/firebase';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import {
  updateLike,
  uploadCommentList,
  uploadCommentWholeList,
} from 'data/galleryComment';
import { deleteImage } from 'data/galleryImage';
import { RootState } from 'redux/types'; // RootState 타입 추가
import { useSelector } from 'react-redux';
import './_modal.scss';
import './ModalCommentList.scss';

interface IModalComment {
  image: string;
  imgId: string;
  categoryId: string;
  commentsListData: any;
  writerId: string;
  writerName: string;
  likeData?: number;
}

interface IComment {
  commentsTime: string;
  commentUid: string;
  text: string;
  commentUser: string;
  userImage?: string;
}

export function ModalComment({
  writerId,
  writerName,
  image,
  imgId,
  categoryId,
  commentsListData,
  likeData,
}: IModalComment): JSX.Element {
  const [like, setLike] = useState<number>(0);
  const [comment, setComment] = useState<string>('');
  const [commentList, setCommentList] = useState<IComment[]>([]);
  const [isChange, setChange] = useState<boolean>(true);

  //스토어 유저 정보
  const user = useSelector((state: RootState) => state);

  //like
  async function handleLike(e: React.MouseEvent) {
    e.preventDefault();
    setLike(like + 1);
  }

  //like DB 저장
  useEffect(() => {
    updateLike(imgId, categoryId, like);
  }, [like]);

  // 이미지 게시글 삭제
  async function handleDeleteImage(e: React.MouseEvent) {
    e.preventDefault();
    if (writerId == user.uid) {
      await deleteImage(categoryId, imgId);
      alert('삭제에 성공했습니다.');
      location.reload();
    } else {
      alert('삭제 권한이 없습니다.');
    }
  }

  //댓글 저장
  const handleComments = (e: React.ChangeEvent<HTMLInputElement>) => {
    setComment(e.target.value);
  };

  //submit 후 DB 저장
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (comment !== '') {
      const newCommentList: any = [...commentList, comment];
      await setCommentList(newCommentList); //새 배열에 comment저장 후 set
      await uploadCommentList(
        imgId,
        categoryId,
        comment,
        user.uid,
        user.nickname,
        user.image,
      ); //댓글 업로드
      alert('Success! 저장에 성공했습니다.');
      await setChange((prev: boolean) => !prev);
    } else if (comment == '') {
      alert(' Fail! 입력칸에 내용을  입력해주세요.');
    }
  };

  //실시간 댓글리스트 업데이트 함수
  function getRealTimeCommentList() {
    const fetchList = async (categoryId: string, imgId: string) => {
      // ... try, catch 생략
      const commentsRef = doc(db, categoryId, imgId);
      const unsub = onSnapshot(commentsRef, (doc) => {
        setCommentList(doc.data()?.comments);
      });
      return unsub;
    };
    return fetchList(categoryId, imgId);
  }

  //실시간 댓글리스트 업데이트
  useEffect(() => {
    if (comment !== '') {
      getRealTimeCommentList(); //실시간 가져오기
    }
    setComment('');
  }, [isChange, doc, onSnapshot]);

  // 댓글 삭제
  const handleDeleteComment = async (
    e: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const getDelText: string = (
      e.currentTarget.previousElementSibling as HTMLElement
    )?.id;
    const getDelUid: string = (
      e.currentTarget.closest('.commentList-item') as HTMLElement
    )?.id;

    try {
      const updatedData = commentList.filter((comment) => {
        return (
          comment.text !== getDelText.trim() &&
          comment.commentUid == getDelUid.trim()
        );
      });
      await setCommentList(updatedData);
      //배열 형태로 db업로드
      await uploadCommentWholeList(updatedData, imgId, categoryId);
      await setChange((prev: boolean) => !prev);
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
    <div className="comment-container">
      <div className="comment-header">
        <span className="comment-imageUploaderName">작성자 : {writerName}</span>

        {user.nickname === writerName ? (
          <button
            className="btn--delImagebtn btn btn-primary"
            onClick={handleDeleteImage}
          >
            이미지 게시글 삭제
          </button>
        ) : null}
      </div>

      <div className="comment-container-inner">
        <div className="imageView-container">
          <div className="imageView-imageBox">
            <img className="imageView-imageBox-image" src={image} alt={image} />
          </div>
          <span className="imageView-like" onClick={handleLike}>
            💖{like} likes
          </span>
          <span className="imageView-commentForm-writer">{user.nickname}</span>
          {user.uid ? (
            <form
              onSubmit={handleSubmit}
              className="imageView-commentForm commentForm"
            >
              <label htmlFor="comment"></label>
              <input
                type="text"
                id="comment"
                placeholder="댓글 추가..."
                value={comment}
                onChange={handleComments}
              />
              <button type="submit" className="btn btn-primary">
                게시
              </button>
            </form>
          ) : (
            <h2>댓글 작성을 위해 로그인이 필요합니다.</h2>
          )}
        </div>

        <div className="commentList-container">
          <div className="commentList-header">😄 comments</div>
          <ul>
            {commentList?.map((comment) => (
              <li
                key={comment.commentsTime}
                id={comment.commentUid}
                className="commentList-item"
              >
                <div className="commentBox" id={comment.text}>
                  <img
                    className="commentBox-image"
                    src={comment.userImage}
                    alt=""
                  />
                  <div className="commentBox-text">
                    <div>
                      <span className="comment-name">
                        {comment.commentUser}
                      </span>
                    </div>
                    <div>
                      <span className="comment-text">{comment.text}</span>
                    </div>
                  </div>
                </div>
                {user.nickname === comment.commentUser ? (
                  <span
                    className="btn-delComment commentList-item-delBtn"
                    onClick={handleDeleteComment}
                  >
                    🗑
                  </span>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
