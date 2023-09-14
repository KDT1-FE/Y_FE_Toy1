import React, { useState, useRef, useCallback } from 'react';

interface IAddImageProp {
  btnName: string;
  contents: any;
}

export function Modal({ btnName, contents }: IAddImageProp) {
  const modalRef: any = useRef();
  return (
    <div>
      <button // 이미지 추가하는 버튼 (Modal open)
        type="button"
        className="btn btn-primary btn--galleryModalOpen"
        onClick={() => modalRef.current?.showModal()}
      >
        {btnName}
      </button>

      <dialog // Modal 창
        ref={modalRef}
      >
        <h1>이것은 모달입니다</h1>

        {contents}

        <button
          onClick={() => modalRef.current?.close()} // 📍 모달 닫기
        >
          Close
        </button>
      </dialog>
    </div>
  );
}
