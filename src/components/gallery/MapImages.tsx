import React, { useRef, useEffect } from 'react';
import { ModalComment } from './ModalComment';

export function MapImages({
  userId,
  nickName,
  image,
  categoryId,
  commentsListData,
  like,
}: any) {
  const modalRef: any = useRef();

  return (
    <div className="slide-card-image">
      <div
        key={image.id}
        id={categoryId}
        className="slide__images"
        onClick={() => modalRef.current?.showModal()}
      >
        <img src={image.image} />

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

          <button
            type="button"
            onClick={() => {
              try {
                modalRef.current?.close();
              } catch {
                console.error();
              }
            }} // 📍 모달 닫기
          >
            Close
          </button>
        </dialog>
      </div>
    </div>
  );
}
