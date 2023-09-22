import React, { useRef } from 'react';
import { AddImageDragDrop } from './NavAddImage';
import './_modal.scss';
import './ModalAddImage.scss';
import '../../styles/_common.scss';

export function AddImageModal(): JSX.Element {
  const modalRef = useRef<HTMLDialogElement | null>(null);
  return (
    <div>
      <button // 이미지 추가하는 버튼 (Modal open)
        type="button"
        className="btn btn-addImage big-btn"
        onClick={() => modalRef.current?.showModal()}
      >
        이미지 업로드
      </button>

      <dialog ref={modalRef} className="modal-container modal-container-image">
        <div className="modal-inner modal-addImage-inner">
          <h2>이미지를 선택해주세요!</h2>

          <AddImageDragDrop />

          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary btn-modalClose"
              onClick={async () => {
                await modalRef.current?.close();
                location.reload();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
