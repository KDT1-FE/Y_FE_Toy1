export const timeToLocaleTimeString = (timestamp: number) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString('it-IT');
};

export const formatMsToTime = (Ms: number) => {
  let totalSeconds = Math.floor(Ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  totalSeconds %= 3600;
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');

  return `${hours}:${minutes}:${seconds}`;
};
