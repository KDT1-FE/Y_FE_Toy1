import { format, formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';

/**
 * @description 시간을 입력 받으면 필요에 따라 format해주는 함수
 * @param {number} workTime 업무 시간
 * @param {boolean} isFinishing 종료 여부
 */

export const timeFormat = (workTime: number, isFinishing = false) => {
  if (workTime < 60) {
    return isFinishing
      ? finishTimeString(`${workTime}초`)
      : nowTimeString(`${workTime}초`);
  }

  if (workTime >= 60 && workTime < 360) {
    const minute = Math.floor(workTime / 60);
    const second = Math.floor(workTime % 60);
    return isFinishing
      ? finishTimeString(`${minute}분 ${second}초`)
      : nowTimeString(`${minute}분 ${second}초`);
  }

  const hour = Math.floor(workTime / 3600);
  const minute = Math.floor((workTime % 3600) / 60);
  return isFinishing
    ? finishTimeString(`${hour}시간 ${minute}분}`)
    : nowTimeString(`${hour}시간 ${minute}분}`);
};

/**
 * @description Date를 입력 받으면 시간 : 분 : 초 형식으로 출력
 * @param {Date} date
 */

export const liveClockFormat = (date: Date) => {
  const timeString = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return timeString.replace(/:/g, ' : ');
};

/**
 * @description 현재 날짜를 형식에 맞게 출력해주는 함수
 */
export const dayFormat = (date: Date | undefined) => {
  if (!date) return;
  return format(new Date(date), 'yyyy-MM-dd');
};

const nowTimeString = (workTime: string) => {
  return `${workTime} 동안 업무 중`;
};

const finishTimeString = (workTime: string) => {
  return `${workTime} 동안 업무하셨습니다!`;
};

/**
 * @description 현재 시간에 따라 작성된 시간의 차를 알려주는 함수
 * @param {Date} date
 * @returns format된 형식의 날짜.
 */
export const dateFormat = (date: Date) => {
  const renewDate = new Date(date);
  const now = Date.now();

  const diff = (now - renewDate.getTime()) / 1000;
  if (diff < 60 * 1) {
    return '방금 전';
  }

  if (diff < 60 * 60 * 24 * 3) {
    return formatDistanceToNow(renewDate, { addSuffix: true, locale: ko });
  }
  return format(renewDate, 'PPP EEE p', { locale: ko });
};

/**
 * @description 초단위의 숫자를 받으면 원하는 초, 분, 시 형태로 포맷해주는 함수
 * @param {number} seconds
 * @returns 포맷된 형식의 시간
 */
export const secondFormat = (seconds: number) => {
  if (seconds < 60) {
    return `${seconds}초`;
  } else if (seconds < 3600) {
    const minutes = Math.floor(seconds / 60);
    const remainSeconds = seconds % 60;
    return `${minutes}분 ${remainSeconds}초`;
  } else {
    const hours = Math.floor(seconds / 3600);
    const remainMinutes = Math.floor((seconds % 3600) / 60);
    const remainSeconds = seconds % 60;
    return `${hours}시간${remainMinutes}분${remainSeconds}초`;
  }
};
