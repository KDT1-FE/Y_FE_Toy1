export const timeToLocaleTimeString = (timestamp: number) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString('it-IT');
};

export const formatMsToTime = (time: number) => {
  const newTime = new Date(time).toISOString();
  const startIndex = newTime.indexOf('T');
  const lastIndex = newTime.indexOf('.');
  const formattedTime = newTime.slice(startIndex + 1, lastIndex);

  console.log(formattedTime);
  return formattedTime;
};
