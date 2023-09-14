import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { commuteState } from '../data/atoms';
import { MdOutlineKeyboardDoubleArrowDown } from 'react-icons/md';
import { formatMsToTime, timeToLocaleTimeString } from '../utils/formatTime';
import CommuteButton from '../common/CommuteButton';
import useUserDetail from '../hooks/useUserDetail';
import { uploadCommuteInfo } from '../utils/firebaseUtils';

interface Props {
  isModalOpen: boolean;
}

const CommuteModal = ({ isModalOpen }: Props) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [commuteInfo, setCommuteInfo] = useRecoilState(commuteState);
  const { isLogin, uid } = useUserDetail();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleCommuteToggle = () => {
    let updatedCommuteInfo;

    if (commuteInfo.commute) {
      updatedCommuteInfo = {
        ...commuteInfo,
        commute: false,
        endTime: Date.now(),
        workingTime: Date.now() - commuteInfo.startTime,
      };

      setCommuteInfo(updatedCommuteInfo);
      // 일한 시간 업로드
      console.log(updatedCommuteInfo);

      uploadCommuteInfo(uid, updatedCommuteInfo);
    } else {
      setCommuteInfo({
        ...commuteInfo,
        commute: true,
        startTime: Date.now(),
      });

      // firebase에 출근 시간 기록
    }
  };

  const [hour, minute, second] = currentTime.toLocaleTimeString('it-IT').split(':');
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
    timeZone: 'UTC',
  };

  return (
    <ModalContainer className={isModalOpen ? 'open' : ''} id="commute-modal">
      <div className="wrapper">
        <span className="date">{currentTime.toLocaleDateString('ko-KR', options)}</span>
        <div className="timer">
          <span>{hour}</span> : <span>{minute}</span> : <span>{second}</span>
        </div>
        <div className="content-wrapper">
          {!isLogin ? (
            '로그인이 필요합니다.'
          ) : (
            <>
              <div className="commute-time">
                <span>
                  {commuteInfo.startTime
                    ? timeToLocaleTimeString(commuteInfo.startTime)
                    : '출근 전'}
                </span>
                <MdOutlineKeyboardDoubleArrowDown size="24" opacity="0.3" />
                <span>
                  {commuteInfo.endTime ? timeToLocaleTimeString(commuteInfo.endTime) : '퇴근 전'}
                </span>
              </div>
              <div className="btn-wrapper">
                {commuteInfo.commute ? (
                  <CommuteButton handleCommute={handleCommuteToggle}>
                    <span>퇴근</span>
                  </CommuteButton>
                ) : (
                  <CommuteButton handleCommute={handleCommuteToggle}>
                    <span>출근</span>
                  </CommuteButton>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled.div`
  position: absolute;
  top: 3rem;
  right: 0.6rem;
  z-index: 100;

  min-width: 300px;

  visibility: hidden;
  opacity: 0;
  transition:
    opacity 0.2s ease-in-out,
    visibility 0.2s ease-in-out;

  &.open {
    visibility: visible;
    opacity: 1;
  }

  .wrapper {
    position: relative;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding: 0.6rem 1rem;

    border-radius: 0.6rem;
    border: 1px solid #eeeeee;
    background-color: #ffffff;
    box-shadow: 0 0 15px 0 rgba(0, 0, 0, 0.15);

    .timer {
      display: flex;
      align-items: center;
      column-gap: 0.4rem;

      margin-bottom: 1rem;

      span {
        font-size: 1.5rem;
        font-weight: 600;
      }
    }

    .date {
      font-size: 0.8rem;

      opacity: 0.5;
    }

    .content-wrapper {
      display: flex;
      align-items: center;
      flex-direction: column;

      width: 100%;

      .commute-time {
        display: flex;
        flex-direction: column;
        align-items: center;
        row-gap: 1rem;

        margin-bottom: 1rem;
      }

      .btn-wrapper {
        width: 100%;

        button {
          display: flex;
          align-items: center;
          justify-content: center;

          width: 100%;

          padding: 0.6rem 1rem;

          border-radius: 2rem;
          border: 1px solid #222222;
          background-color: #ffffff;

          &:hover {
            background-color: #f2f2f2;
          }

          &.worked {
            opacity: 0.5;
          }
        }
      }
    }
  }
`;

export default CommuteModal;
