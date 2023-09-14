import styled from 'styled-components';
import commuteLogo from '../../assets/icons/commute.svg';
import closeButton from '../../assets/icons/closeButton.svg';
import React, { useState } from 'react';
import ReactModal from 'react-modal';
import LiveClock from './LiveClock';
import { INTERVAL, WORK_TIME_INITIAL_VALUE } from 'constants/time';
import useInterval from 'hooks/useInterval';
import { timeFormat } from 'utils/format';

function Modal() {
  const [showModal, setShowModal] = useState(false);
  const [workTime, setWorkTime] = useState(WORK_TIME_INITIAL_VALUE);
  const [isRunning, setIsRunning] = useState(false);
  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const [isFinishing, setisFinishing] = useState(false);

  useInterval(
    () => {
      setWorkTime(workTime + 1);
    },
    isRunning ? INTERVAL : null,
  );

  return (
    <>
      <CommuteMenu
        onClick={() => {
          setShowModal(true);
        }}
      >
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
          <CloseImg
            src={closeButton}
            onClick={() => {
              setShowModal(false);
            }}
            alt="close icon"
          />
        </TopContainer>
        <MainContainer>
          <LiveClock />
          <BottomContainer>
            <StyledStateText>
              {isRunning ? timeFormat(workTime) : '출근 전'}
            </StyledStateText>
            <StyledButton
              onClick={() => {
                if (isRunning) {
                  setisFinishing(true);
                  setWorkTime(WORK_TIME_INITIAL_VALUE);
                }
                setIsRunning(!isRunning);
              }}
            >
              {isRunning ? '퇴근' : '출근'}
            </StyledButton>
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
const StyledStateText = styled.div`
  color: #4a5568;
  font-size: 1.1rem;
  font-weight: 600;
`;

const StyledButton = styled.button`
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
