import { memo } from 'react';
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

  if (!uid) return <p>로그인이 필요합니다.</p>;
  if (gotToWork) {
    return <p>이미 출근 기록이 있습니다. 다시 출근 하시겠습니까?</p>;
  }
  if (hasNoWorked) {
    return <p>출근 하시겠습니까?</p>;
  }
  if (isWorking) {
    return <p>퇴근 하시겠습니까?</p>;
  }
  if (workingTime) {
    return (
      <p>
        총 근무 시간이 맞으면 확인을 눌러주세요. <br />{' '}
        <strong>{formatMsToTime(workingTime)}</strong>
      </p>
    );
  }
};

export default memo(ModalMessage);
