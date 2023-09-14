import React from "react";
import "../../styles/TimerModal.css";

interface ModalType {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}

export default function Modal({isOpen, onClose, children}: ModalType) {
  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      onClose();
    }
  };

  return isOpen ? (
    <div
      className="ModalBackdrop"
      onClick={onClose}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="ModalContent"
        role="presentation"
      >
        {children}
      </div>
    </div>
  ) : null;
}

export {};
