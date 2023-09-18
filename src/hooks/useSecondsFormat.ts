function useSecondsFormat(seconds: number) {
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
}

export default useSecondsFormat;
