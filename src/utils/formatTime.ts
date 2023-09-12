export const timeToLocaleTimeString = (timestamp: number) => {
  const time = new Date(timestamp);
  return time.toLocaleTimeString('it-IT');
};
