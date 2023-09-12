import styled from 'styled-components';
import commuteLogo from '../../assets/icons/CommuteLogo.svg';
import { useState } from 'react';
import ReactModal from 'react-modal';

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => {
    setShowModal(true);
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      <CommuteMenu onClick={handleOpenModal}>
        Commute
        <img src={commuteLogo}></img>
      </CommuteMenu>
      <CustomModal
        isOpen={showModal}
        ariaHideApp={false}
        className="modal"
        overlayClassName="overlay"
      >
        <button onClick={handleCloseModal}>Close Modal</button>
      </CustomModal>
    </>
  );
}

export const Menu = styled.button`
  font-size: 1.1rem;
  font-weight: 300;
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  cursor: pointer;
  &:hover {
    border-bottom: 1px solid #4a5568;
  }
`;

export const CommuteMenu = styled(Menu)`
  border: 1px solid #e2e8f0;
  border-radius: 0.9rem;
  padding: 0.5rem;
  &:hover {
    background-color: #edf2f7;
    border-bottom: none;
  }
`;
const CustomModal = styled(ReactModal)`
  &.modal {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 548px;
    height: 440px;
    background-color: #fff;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
`;
export default Modal;
