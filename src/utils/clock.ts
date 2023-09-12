import {useEffect} from "react";

function Clock() {
  const newTime: HTMLElement | null = document.getElementById("clock");

  function addZero(num: number): string {
    if (num < 10) {
      return `0${num}`;
    }
    return num.toString();
  }

  function watch() {
    const date: Date = new Date();
    const year: number = date.getFullYear();
    const month: number = date.getMonth();
    const nowDate: number = date.getDate();
    const day: number = date.getDay();
    const week: string[] = ["일", "월", "화", "수", "목", "금", "토"];
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    if (newTime) {
      newTime.innerHTML = `${year}년 ${addZero(month + 1)}월 ${addZero(
        nowDate,
      )}일 ${week[day]}요일 ${addZero(hours)}시 ${addZero(minutes)}분`;
    }
  }

  function init() {
    watch();
    setInterval(watch, 1000);
  }

  useEffect(() => {
    init();
  }, []);

  return null;
}

export default Clock;
