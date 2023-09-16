import React, { useRef } from 'react';
import { ModalComment } from './ModalComment';

export function MapImages({
  userId,
  nickName,
  image,
  categoryId,
  commentsListData,
}: any) {
  const modalRef: any = useRef();

  return (
    <div>
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
