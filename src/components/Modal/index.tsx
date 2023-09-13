import styled from 'styled-components';
import commuteLogo from '../../assets/icons/commuteLogo.svg';
import closeButton from '../../assets/icons/closeButton.svg';
import React, { useState } from 'react';
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
      <ReactModal
        isOpen={showModal}
        ariaHideApp={false}
        className="_"
        overlayClassName="_"
        contentElement={(props, children) => (
          <ModalStyle {...props}>{children}</ModalStyle>
        )}
        overlayElement={(props, contentElement) => (
          <OverlayStyle {...props}>{contentElement}</OverlayStyle>
        )}
      >
        <TopContainer>
          <Title>
            출퇴근<StyledDate>2023.09.08(금)</StyledDate>
          </Title>
          <CloseImg src={closeButton} onClick={handleCloseModal} />
        </TopContainer>
        <MainContainer>
          <Time>14 : 05 : 16</Time>
          <BottomContainer>
            <StateText>출근 전</StateText>
            <Button>출근</Button>
          </BottomContainer>
        </MainContainer>
      </ReactModal>
    </>
  );
}

const CommuteMenu = styled.div`
  font-size: 1.1rem;
  font-weight: 300;

  background-color: #fff;
  border-radius: 0.9rem;
  padding: 0.5rem;
  border: 1px solid #e2e8f0;

  display: flex;
  align-items: center;
  gap: 0.3rem;

  &:hover {
    background-color: #edf2f7;
    border-bottom: none;
  }
`;

const ModalStyle = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;

  width: 34.25rem;
  height: 27.5rem;

  background-color: #fff;
  transform: translate(-50%, -50%);
  z-index: 1;
  padding-top: 1.4375rem;
  padding-bottom: 5.6rem;

  border-radius: 0.375rem;
  border: none;
`;

const OverlayStyle = styled.div`
  position: fixed;
  inset: 0px;
  background-color: rgba(0, 0, 0, 0.45);
`;
const TopContainer = styled.section`
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 1.875rem;
  height: 7rem;
`;
const Title = styled.div`
  font-size: 2rem;
  font-weight: 600;
  align-self: flex-end;
`;
const CloseImg = styled.img`
  width: 1.25rem;
  height: 1.25rem;
  cursor: pointer;
`;
const StyledDate = styled.div`
  color: #4a5568;
  font-size: 0.875rem;
  font-weight: 600;
  margin-top: 0.3rem;
`;
const MainContainer = styled.section`
  height: 10rem;
  margin-top: 3.2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
const Time = styled.div`
  font-size: 4.3rem;
  font-weight: 600;
`;
const BottomContainer = styled.section`
  display: flex;
  gap: 2.5rem;
  width: 22rem;
  align-items: center;
  justify-content: flex-end;
`;
const StateText = styled.div`
  color: #4a5568;
  font-size: 1.25rem;
  font-weight: 600;
`;
const Button = styled.button`
  background-color: #3584f4;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 600;
  width: 9.3rem;
  height: 2.4rem;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.375rem;
  cursor: pointer;
  &:hover {
    background-color: #1b64da;
  }
`;
export default Modal;
