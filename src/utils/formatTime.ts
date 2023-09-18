export const formatDate = (timestamp: number = Date.now(), language: string = 'ko-KR') => {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  };

  return new Date(timestamp).toLocaleDateString(language, options);
};

export const formatMsToTime = (time: number) => {
  const newTime = new Date(time).toISOString();
  const startIndex = newTime.indexOf('T');
  const lastIndex = newTime.indexOf('.');
  const formattedTime = newTime.slice(startIndex + 1, lastIndex);

  console.log(formattedTime);
  return formattedTime;
};
