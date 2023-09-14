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

export const liveClockFormat = (date: Date) => {
  const timeString = date.toLocaleTimeString('en-US', {
    hour12: false,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
  return timeString.replace(/:/g, ' : ');
};

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
