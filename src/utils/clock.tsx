import React, {useEffect, useState} from "react";

type ClockProps = {
  isModal?: boolean;
};

function Clock({isModal = false}: ClockProps) {
  const [timeString, setTimeString] = useState("");
  function addZero(num: number): string {
    return `${num}`.padStart(2, "0");
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
    const seconds: number = date.getSeconds();

    if (isModal) {
      setTimeString(
        `${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`,
      );
    } else {
      setTimeString(
        `${year}년 ${addZero(month + 1)}월 ${addZero(nowDate)}일 ${
          week[day]
        }요일 ${addZero(hours)}시 ${addZero(minutes)}분`,
      );
    }
  }

  function init() {
    watch();
    const INTERVAL_IN_MILLISECONDS = 1000;
    setInterval(watch, INTERVAL_IN_MILLISECONDS);
  }

  useEffect(() => {
    init();
  }, []);

  return (
    <p id="Clock" className={isModal ? "ModalClock" : "HeaderClock"}>
      {timeString}
    </p>
  );
}

Clock.defaultProps = {
  isModal: false,
};

export default Clock;
