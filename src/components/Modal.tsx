import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import '../scss/components/_modal.scss';

interface ModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
  showCloseButton?: boolean;
}

const Modal = ({ children, onClose, showCloseButton = true }: ModalProps): JSX.Element => {
  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (onClose && e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="modal__wrap" onClick={handleOutsideClick}>
      <div className="modal__box">
        {showCloseButton && <AiOutlineClose className="modal__close-btn" onClick={onClose} />}
        {children}
      </div>
    </div>
  );
};

export default Modal;
