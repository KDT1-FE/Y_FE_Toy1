const calculateStudyTime = (
  startTime: number,
  endTime: number,
  totalBreakTime: number,
): string => {
  const studyDuration = endTime - startTime - totalBreakTime;
  const hours = Math.floor(studyDuration / 3600000);
  const minutes = Math.floor((studyDuration % 3600000) / 60000);
  const seconds = Math.floor((studyDuration % 60000) / 1000);

  return `총 공부 시간 : ${hours}시간 ${minutes}분 ${seconds}초`;
};

export default calculateStudyTime;
