import React, {useEffect, useState} from "react";

function Clock() {
  const [timeString, setTimeString] = useState("");
  function addZero(num: number): string {
    return `${num}`.padStart(2, "0");
  }

  function watch() {
    const date: Date = new Date();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();
    const seconds: number = date.getSeconds();

    setTimeString(
      `${addZero(hours)}   :   ${addZero(minutes)}   :   ${addZero(seconds)}`,
    );
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
    <p id="Clock" className="ModalClock">
      {timeString}
    </p>
  );
}

export default Clock;
