export class Time {
  private timestamp: number;
  private language: string;
  private options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'long',
    timeZone: 'Asia/Seoul',
  };

  constructor(timestamp: number = Date.now(), language: string = 'ko-KR') {
    this.timestamp = timestamp;
    this.language = language;
  }

  get date() {
    return this.getDate();
  }

  get time() {
    return this.getTime();
  }

  private getDate = () => {
    return new Date(this.timestamp).toLocaleDateString(this.language, this.options);
  };

  private getTime = () => {
    const options: Intl.DateTimeFormatOptions = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
      timeZone: 'Asia/Seoul',
    };

    const formattedTime = new Date(this.timestamp).toLocaleTimeString(this.language, options);
    const [dayPeriod, time] = formattedTime.split(' ');

    return `${dayPeriod} ${time}`;
  };
}

export const formatMsToTime = (time: number) => {
  const newTime = new Date(time).toISOString();
  const startIndex = newTime.indexOf('T');
  const lastIndex = newTime.indexOf('.');
  const formattedTime = newTime.slice(startIndex + 1, lastIndex);

  console.log(formattedTime);
  return formattedTime;
};
