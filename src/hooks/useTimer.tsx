import {useState, useEffect} from "react";
import useInterval from "./useInterval";
import {calculateTimer} from "../utils/timerAndRanking";

export default function useTimer(initialTime: number = 0) {
  const savedIsRunning = localStorage.getItem("isRunning") === "true";
  const savedTime = localStorage.getItem("timeInSeconds");
  const savedOnBreak = localStorage.getItem("onBreak");
  const initialOnBreakState = savedOnBreak ? JSON.parse(savedOnBreak) : false;
  const initialTimeState = savedTime ? parseInt(savedTime, 10) : initialTime;
  const savedPlayTime = localStorage.getItem("playTime");
  const savedStopTime = localStorage.getItem("stopTime");
  const savedStartTime = localStorage.getItem("startTime");
  const savedBreakStartTime = localStorage.getItem("breakStartTime");
  const savedTotalBreakTime = localStorage.getItem("totalBreakTime");

  const [timeInSeconds, setTimeInSeconds] = useState<number>(initialTimeState);
  const [isRunning, setIsRunning] = useState<boolean>(savedIsRunning);
  const [onBreak, setOnBreak] = useState<boolean>(initialOnBreakState);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);
  const [playTime, setPlayTime] = useState<string | null>(savedPlayTime);
  const [stopTime, setStopTime] = useState<string | null>(savedStopTime);
  const [startTime, setStartTime] = useState<number | null>(
    savedStartTime ? parseInt(savedStartTime, 10) : null,
  );
  const [breakStartTime, setBreakStartTime] = useState<number | null>(
    savedBreakStartTime ? parseInt(savedBreakStartTime, 10) : null,
  );
  const [totalBreakTime, setTotalBreakTime] = useState<number>(
    savedTotalBreakTime ? parseInt(savedTotalBreakTime, 10) : 0,
  );

  useInterval(() => {
    if (isRunning) {
      setTimeInSeconds((prev: number) => prev + 1);
    }
  }, 1000);

  useEffect(() => {
    const timeArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    if (!isRunning && timeInSeconds === 0) {
      localStorage.removeItem("isRunning");
      localStorage.removeItem("timeInSeconds");
      localStorage.removeItem("playTime");
      localStorage.removeItem("stopTime");
      localStorage.removeItem("onBreak");
      localStorage.removeItem("startTime");
      localStorage.removeItem("breakStartTime");
      localStorage.removeItem("totalBreakTime");
    } else {
      localStorage.setItem("isRunning", isRunning.toString());
      localStorage.setItem("timeInSeconds", timeInSeconds.toString());
      localStorage.setItem("playTime", playTime || "");
      localStorage.setItem("stopTime", stopTime || "");
      localStorage.setItem("onBreak", JSON.stringify(onBreak));
      if (startTime) {
        localStorage.setItem("startTime", startTime.toString());
      }
      if (breakStartTime !== null) {
        localStorage.setItem("breakStartTime", breakStartTime.toString());
      } else {
        localStorage.removeItem("breakStartTime");
      }
      localStorage.setItem("totalBreakTime", totalBreakTime.toString());
    }
  }, [
    isRunning,
    timeInSeconds,
    playTime,
    stopTime,
    startTime,
    onBreak,
    breakStartTime,
    totalBreakTime,
  ]);

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
    breakStartTime,
    setBreakStartTime,
    totalBreakTime,
    setTotalBreakTime,
  };
}
