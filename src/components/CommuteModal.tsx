import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { formatMsToTime } from '../utils/formatTime';
import CommuteButton from '../common/CommuteButton';
import { uploadCommuteInfo } from '../utils/firebaseUtils';
import { useUser } from '../common/UserContext';
import useCommute from '../hooks/useCommute';

interface Props {
  isModalOpen: boolean;
  toggleModal: () => void;
}

const CommuteModal = ({ isModalOpen, toggleModal }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const { user } = useUser();
  const uid = user?.uid;
  const { commuteInfo, setCommuteInfo } = useCommute(uid);
  const { isWorking, hasWorked, workingTime, startTime } = commuteInfo;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCommute = () => {
    let updatedCommuteInfo;

    // 퇴근 눌렀을 때
    if (isWorking) {
      updatedCommuteInfo = {
        ...commuteInfo,
        date: Date.now(),
        isWorking: false,
        endTime: Date.now(),
        workingTime: Date.now() - startTime,
      };

      setCommuteInfo(updatedCommuteInfo);
    } else {
      // 출근 눌렀을 때
      setCommuteInfo({
        ...commuteInfo,
        isWorking: true,
        startTime: Date.now(),
      });
      toggleModal();
    }
  };

  // 확인 눌렀을 때
  const confirmWorkingTime = () => {
    uploadCommuteInfo(uid, commuteInfo);
    setCommuteInfo({
      ...commuteInfo,
      hasWorked: true,
      workingTime: 0,
    });
    toggleModal();
  };

  // 수정 기능은 보류
  const editWorkingTime = () => {
    toggleModal();
  };

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'UTC',
  };

  const renderContentMessage = () => {
    if (hasWorked && !isWorking && !workingTime) {
      return <span>이미 출근 기록이 있습니다. 다시 출근 하시겠습니까?</span>;
    }
    if (!hasWorked && !isWorking) {
      return <span>출근 하시겠습니까?</span>;
    }
    if (isWorking) {
      return <span>퇴근 하시겠습니까?</span>;
    }
    if (!isWorking && workingTime) {
      return (
        <span>
          총 근무 시간이 맞으면 확인을 눌러주세요. <strong>{formatMsToTime(workingTime)}</strong>
        </span>
      );
    }
  };

  const mainButtonLabel = workingTime ? '확인' : isWorking ? '퇴근' : '출근';
  const mainButtonHandler = workingTime ? confirmWorkingTime : handleCommute;
  const secondaryButtonLabel = workingTime ? '수정' : '취소';
  const secondaryButtonHandler = workingTime ? editWorkingTime : toggleModal;

  return (
    <>
      <Overlay onClick={toggleModal} className={isModalOpen ? 'open' : ''} />
      <ModalContainer className={isModalOpen ? 'open' : ''} id="commute-modal">
        <TimerWrapper>
          <span className="date">{currentTime.toLocaleDateString('ko-KR', options)}</span>
          <span className="time">{currentTime.toLocaleTimeString('it-IT')}</span>
        </TimerWrapper>

        <ContentWrapper>{renderContentMessage()}</ContentWrapper>

        <ButtonWrapper>
          <CommuteButton onClick={mainButtonHandler}>{mainButtonLabel}</CommuteButton>
          <CommuteButton onClick={secondaryButtonHandler}>{secondaryButtonLabel}</CommuteButton>
        </ButtonWrapper>
      </ModalContainer>
    </>
  );
};

const Overlay = styled.div`
  position: fixed;
  display: none;
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

  max-width: 300px;
  min-height: 400px;

  border-radius: 0.6rem;
  border: 1px solid #eeeeee;
  box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);

  background-color: #ffffff;

  opacity: 0;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &.open {
    transform: translate(-50%, -50%) scale(1);
    opacity: 1;
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
  border-top: 1px solid #eeeeee;
`;

export default CommuteModal;
