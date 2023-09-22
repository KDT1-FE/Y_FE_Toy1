import React, {useState} from "react";
import {ControlsProps} from "../../types/Modal";
import "../../styles/timer/timerModal.css";
import {
  calculateStudyTime,
  saveTimeInBrowser,
} from "../../utils/timerAndRanking";
import {ReactComponent as PlayIcon} from "../../assets/icons/PlayBtn.svg";
import {ReactComponent as StopIcon} from "../../assets/icons/StopBtn.svg";

function Controls(props: ControlsProps) {
  const {
    setTimeInSeconds,
    setIsRunning,
    isRunning,
    setStudyDuration,
    onBreak,
    setOnBreak,
    setPlayTime,
    setStopTime,
    startTime,
    setStartTime,
    setStatusText,
    timeInSeconds,
  } = props;

  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const [totalBreakTime, setTotalBreakTime] = useState(0);
  const [isFirstPlay, setIsFirstPlay] = useState(true);

  const addZero = (num: number): string => `${num}`.padStart(2, "0");

  const getCurrentTime = (): string => {
    const currentDate = new Date();
    return `${addZero(currentDate.getHours())}:${addZero(
      currentDate.getMinutes(),
    )}:${addZero(currentDate.getSeconds())}`;
  };

  // 타이머 초기화
  const resetTimer = () => {
    setIsRunning(false);
    setStartTime(null);
    setBreakStartTime(null);
    setTotalBreakTime(0);
    setTimeInSeconds(0);
    setIsFirstPlay(true);
    setPlayTime(null);
    // sessionStorage.setItem("time", "0");
  };

  // 타이머 시작, 재시작
  const handlePlayButton = () => {
    if (isRunning || onBreak) {
      return;
    }

    if (isFirstPlay) {
      setIsRunning(true);
      setOnBreak(false);
      if (!startTime) {
        setStartTime(Date.now());
      }
      setIsFirstPlay(false);
    }
    setPlayTime(getCurrentTime());
    setStopTime(null);
    setStatusText("공부 중");
  };

  // 타이머 중지, 학습 시간 저장
  const handleStopButton = () => {
    if ((isRunning || onBreak) && startTime !== null) {
      setIsRunning(false);
      setOnBreak(false);
      const endTime = Date.now();

      let effectiveBreakTime = totalBreakTime;

      if (onBreak && breakStartTime !== null) {
        effectiveBreakTime += endTime - breakStartTime;
      }
      const studyDuration = calculateStudyTime(
        startTime,
        endTime,
        effectiveBreakTime,
      );
      setStudyDuration(studyDuration);
      saveTimeInBrowser(timeInSeconds);
      resetTimer();
    }
    setStopTime(getCurrentTime());
    setStatusText(null);
  };

  // 휴식 모드 전환, 휴식 중 타이머 재시작
  const handleBreakButton = () => {
    if (isRunning) {
      setIsRunning(false);
      setOnBreak(true);
      setBreakStartTime(Date.now());
      setStatusText("휴식 중");
    } else if (onBreak) {
      setIsRunning(true);
      setOnBreak(false);
      const breakDuration = Date.now() - (breakStartTime as number);
      setTotalBreakTime(prev => prev + breakDuration);
      setBreakStartTime(null);
      setStatusText("공부 중");
    }
  };

  return (
    <div className="MainContainer">
      <div className="PlayStopContainer">
        <div className="PlayButtonContainer">
          <PlayIcon
            type="button"
            className="PlayButton"
            onClick={handlePlayButton}
          />
        </div>
        <div className="StopButtonContainer">
          <StopIcon
            type="button"
            className="StopButton"
            onClick={handleStopButton}
          />
        </div>
      </div>

      <button
        type="button"
        className={onBreak ? "ResumeButton" : "BreakButton"}
        onClick={handleBreakButton}
      >
        {onBreak ? "휴식끝" : "휴식"}
      </button>
      <button type="button" className="ResetButton" onClick={resetTimer}>
        Reset
      </button>
    </div>
  );
}

export default Controls;
