import React from 'react';
import { commuteType } from '../data/atoms';
import { formatMsToTime } from '../utils/formatTime';

interface Props {
  uid: string | undefined;
  commuteInfo: commuteType;
}

const ModalMessage = ({ uid, commuteInfo }: Props) => {
  const { isWorking, hasWorked, workingTime } = commuteInfo;
  const gotToWork = hasWorked && !isWorking && !workingTime;
  const hasNoWorked = !hasWorked && !isWorking && !workingTime;

  if (!uid) return <span>로그인이 필요합니다.</span>;
  if (gotToWork) {
    return <span>이미 출근 기록이 있습니다. 다시 출근 하시겠습니까?</span>;
  }
  if (hasNoWorked) {
    return <span>출근 하시겠습니까?</span>;
  }
  if (isWorking) {
    return <span>퇴근 하시겠습니까?</span>;
  }
  if (workingTime) {
    return (
      <span>
        총 근무 시간이 맞으면 확인을 눌러주세요. <strong>{formatMsToTime(workingTime)}</strong>
      </span>
    );
  }
};

export default React.memo(ModalMessage);
