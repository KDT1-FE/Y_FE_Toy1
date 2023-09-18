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
export const dayFormat = () => {
  const date = new Date();
  const dateString = date.toLocaleDateString('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
  const day = date.toLocaleString('ko-KR', { weekday: 'short' });
  return `${dateString} (${day})`;
};

const nowTimeString = (workTime: string) => {
  return `${workTime} 동안 업무 중`;
};

const finishTimeString = (workTime: string) => {
  return `${workTime} 동안 업무하셨습니다!`;
};

export const calendarDayFormat = (dateString: Date | undefined) => {
  if (!dateString) {
    return '';
  }
  const date = new Date(dateString);

  const year = date.getFullYear();
  // JavaScript의 getMonth()는 0부터 시작하므로 +1이 필요합니다.
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
};
