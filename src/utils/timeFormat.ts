export const timeFormat = (workTime: number) => {
  if (workTime < 60) return `${workTime}초 동안 업무 중`;
  if (workTime >= 60 && workTime < 360)
    return `${Math.floor(workTime / 60)}분 ${workTime % 60}초 동안 업무 중`;
  const hour = Math.floor(workTime / 3600);
  const minute = Math.floor((workTime % 3600) / 60);
  return `${hour}시간 ${minute}분 동안 업무 중`;
};
