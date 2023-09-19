import {useState, useEffect} from "react";
import calculateTimer from "../utils/timer";

export default function useTimer(initialTime: number = 0) {
  const [timeInSeconds, setTimeInSeconds] = useState<number>(initialTime);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [onBreak, setOnBreak] = useState<boolean>(false);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [playTime, setPlayTime] = useState<string | null>(null);
  const [stopTime, setStopTime] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeInSeconds((prev: number) => prev + 1);
      }, 1000);

      return () => {
        clearInterval(interval);
      };
    }
    return undefined;
  }, [isRunning]);

  useEffect(() => {
    const timeArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  return {
    timeInSeconds,
    setTimeInSeconds,
    isRunning,
    setIsRunning,
    onBreak,
    setOnBreak,
    timerArray,
    playTime,
    setPlayTime,
    stopTime,
    setStopTime,
    startTime,
    setStartTime,
  };
}
