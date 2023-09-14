import React from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import "../../styles/DeleteModal.css";
import {ModalProps} from "../../types/Modal";

export default function DeleteModal({onClose}: ModalProps) {
  return (
    <div className="ModalBackdrop">
      <div className="TimerModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>사진 삭제</p>
        <div className="DeleteModalDes">선택된 사진들은 삭제됩니다.</div>
        <button type="button" className="CancelButton" onClick={onClose}>
          Cancel
        </button>
        <button type="button" className="OKButton" onClick={onClose}>
          OK
        </button>
      </div>
    </div>
  );
}
