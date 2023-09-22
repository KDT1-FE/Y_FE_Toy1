import styled from 'styled-components';
import { MouseEventHandler, useEffect, useState } from 'react';
import { commuteType } from '../data/atoms';
import ModalMessage from './ModalMessage';
import { Time } from '../utils/formatTime';
import { SmallButtonDarkGray, SmallButtonBlue } from '../utils/CommonDesign';

interface Props {
  isModalOpen: boolean;
  toggleModal: () => void;
  confirmWorkingTime: MouseEventHandler<HTMLButtonElement>;
  handleCommute: MouseEventHandler<HTMLButtonElement>;
  commuteInfo: commuteType;
  uid: string | undefined;
}

const CommuteModal = ({
  isModalOpen,
  toggleModal,
  confirmWorkingTime,
  handleCommute,
  commuteInfo,
  uid,
}: Props) => {
  // useRecoilState로 commuteInfo를 가져오기 vs commuteInfo를 props로 받기
  const [currentTime, setCurrentTime] = useState(new Date());
  const { isWorking, workingTime } = commuteInfo;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  // 수정 기능은 보류
  const editWorkingTime: MouseEventHandler = (): void => {
    toggleModal();
  };

  const mainButtonLabel = workingTime ? '확인' : isWorking ? '퇴근' : '출근';
  const mainButtonHandler = workingTime ? confirmWorkingTime : handleCommute;
  const secondaryButtonLabel = workingTime ? '수정' : '취소';
  const secondaryButtonHandler = workingTime ? editWorkingTime : toggleModal;
  const timer = new Time();

  return (
    <>
      <Overlay onClick={toggleModal} className={isModalOpen ? 'open' : ''} />
      <ModalContainer className={isModalOpen ? 'open' : ''} id="commute-modal">
        <TimerWrapper>
          <span className="date">{timer.date}</span>
          <span className="time">{currentTime.toLocaleTimeString('it-IT')}</span>
        </TimerWrapper>

        <ContentWrapper>
          <ModalMessage commuteInfo={commuteInfo} uid={uid} />
        </ContentWrapper>

        <ButtonWrapper>
          {uid && (
            <>
              <SmallButtonBlue onClick={mainButtonHandler}>{mainButtonLabel}</SmallButtonBlue>
              <SmallButtonDarkGray onClick={secondaryButtonHandler}>
                {secondaryButtonLabel}
              </SmallButtonDarkGray>
            </>
          )}
        </ButtonWrapper>
      </ModalContainer>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  display: none;
  z-index: 90;
  top: 0;
  left: 0;
  inset: 0;
  background-color: hsla(0, 0%, 0%, 0.2);

  &.open {
    display: block;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(0.8);
  z-index: 100;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 2rem;

  min-width: 250px;
  max-width: 300px;
  min-height: 400px;

  border: ${(props) => props.theme.colors.card.border};
  border-radius: 0.6rem;
  box-shadow: ${(props) => props.theme.colors.card.shadow};

  background-color: #ffffff;

  visibility: hidden;
  opacity: 0;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease,
    visibility 0.2s ease;

  &.open {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
    visibility: visible;
  }
`;

const TimerWrapper = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const ContentWrapper = styled.div``;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  button {
    width: 110px;
    margin: 0 2.5px;
  }
`;

export default CommuteModal;
