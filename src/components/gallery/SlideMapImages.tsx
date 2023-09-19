import React, { useRef } from 'react';
import { ModalComment } from './ModalComment';

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
    <div className="slide__card">
      <div key={image.id} id={categoryId} className="slide__images">
        <img src={image.image} onClick={() => modalRef.current?.showModal()} />

        <dialog ref={modalRef}>
          <h1>Comment Page</h1>

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
        </dialog>
      </div>
    </div>
  );
}
