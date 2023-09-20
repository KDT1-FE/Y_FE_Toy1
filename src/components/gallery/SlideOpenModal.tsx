import React, { useRef } from 'react';
import { ModalComment } from './ModalCommentList';
import './_modal.scss';
import './SlideRow.scss';

export function MapImages({
  userId,
  nickName,
  image,
  categoryId,
  commentsListData,
  like,
  slideClassName,
}: any): JSX.Element {
  const modalRef: any = useRef();

  return (
    <div className="slide-card">
      <div>
        <img
          key={image.id}
          id={categoryId}
          className="slide-images"
          src={image.image}
          onClick={() => modalRef.current?.showModal()}
        />

        <dialog
          ref={modalRef}
          className="modal-container modal-container-comment"
        >
          <div className="modal-inner modal-comment-inner">
            <h2>Comment Page</h2>

            <ModalComment
              image={image.image}
              imgId={image.id}
              categoryId={categoryId}
              commentsListData={commentsListData}
              writerId={userId}
              writerName={nickName}
              likeData={like}
            />

            <button type="button" onClick={() => modalRef.current?.close()}>
              Close
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
}
