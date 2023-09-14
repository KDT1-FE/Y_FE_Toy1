import React from "react";

interface TimerModalProps {
  onClose: () => void;
}

export default function TimerModal({onClose}: TimerModalProps) {
  return (
    <div className="ModalBackdrop">
      <div className="ModalContent">
        <button type="button" className="CloseButton" onClick={onClose}>
          Close
        </button>
        <p>모달 창 내용</p>
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
