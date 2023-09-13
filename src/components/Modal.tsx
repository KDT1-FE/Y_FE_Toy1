import React, { useState, Dispatch, SetStateAction } from "react";
import styled from "styled-components";

const ModalContainer = styled.div<{ width: string; height: string }>`
  position: fixed;
  display: flex;
  flex-direction: column;
  left: calc(50vw - ${(props) => props.width}px / 2);
  top: calc(50vh - ${(props) => props.height}px / 2);
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 8px;
  background-color: white;
  border-radius: 8px;
  z-index: 200;
  text-align: center;
  .modal__close-btn {
  }
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 50;
`;

const ModalWrapper = styled.div`
  background-color: transparent;
`;

interface Props {
  width: string;
  height: string;
  element: JSX.Element;
  setModal: Dispatch<SetStateAction<boolean>>;
}

export const Modal = ({ width, height, element, setModal }: Props) => {
  const disableModal = () => {
    setModal(false);
  };
  return (
    <>
      <ModalContainer width={width} height={height}>
        <ModalWrapper>{element}</ModalWrapper>
        <button className="btn modal__close-btn" onClick={disableModal}>
          닫기
        </button>
      </ModalContainer>
      <ModalBackground onClick={disableModal} />
    </>
  );
};

// export default Modal;
