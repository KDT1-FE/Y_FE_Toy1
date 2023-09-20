import React, { useRef } from 'react';
import CloseButton from 'react-bootstrap/CloseButton';
import { AddImageDragDrop } from './NavAddImage';
import './_modal.scss';
import './ModalAddImage.scss';

export function AddImageModal() {
  const modalRef: any = useRef();
  return (
    <div>
      <button // 이미지 추가하는 버튼 (Modal open)
        type="button"
        className="btn-addImage"
        onClick={() => modalRef.current?.showModal()}
      >
        이미지 추가
      </button>

      <dialog ref={modalRef} className="modal-container modal-container-image">
        <div className="modal-inner modal-addImage-inner">
          <h2>Image Upload Page</h2>

          <AddImageDragDrop />

          <CloseButton
            onClick={async () => {
              await modalRef.current?.close();
              location.reload();
            }}
          />
        </div>
      </dialog>
    </div>
  );
}
