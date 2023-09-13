import styled from 'styled-components';
import commuteLogo from '../../assets/icons/commuteLogo.svg';
import closeButton from '../../assets/icons/closeButton.svg';
import React, { useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';
import LiveClock from './LiveClock';

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [workSecond, setWorkSecond] = useState(-1);
  const [workMinute, setWorkMinute] = useState(1);
  const [workHour, setWorkHour] = useState(1);

  const interval = useRef(1000);

  const startTimer = () => {
    if (workSecond < 60) {
      if (workSecond === 59) interval.current = 60000;
      setWorkSecond(workSecond + 1);
      return;
    }
    if (workMinute === 59) {
      setWorkHour(workHour + 1);
      setWorkMinute(0);

      return;
    }
    setWorkMinute(workMinute + 1);
  };

  useEffect(() => {
    if (workSecond === -1) return;
    const timeId = setInterval(() => startTimer(), interval.current);

    return () => {
      clearInterval(timeId);
    };
  });

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
          <LiveClock></LiveClock>
          <BottomContainer>
            <StateText>
              {workSecond > 59
                ? `${workMinute}분 동안 업무 중`
                : `${workSecond}초 동안 업무 중`}
            </StateText>
            <Button
              onClick={() => {
                setWorkSecond(0);
              }}
            >
              출근
            </Button>
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
  cursor: pointer;
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
  outline: none;
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

  cursor: default;
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
  cursor: default;
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
