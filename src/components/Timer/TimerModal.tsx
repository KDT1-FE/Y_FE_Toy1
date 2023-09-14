import React from "react";
import "../../styles/TimerModal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Modal({isOpen, onClose}: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="ModalBackdrop">
      <div className="ModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>모달 창 내용</p>
      </div>
    </div>
  );
}

export default Modal;
