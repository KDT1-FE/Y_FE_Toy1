import React, {useState} from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import {TimerModalProps} from "../../types/Modal";
import Controls from "./TimerControls";
import Clock from "../../utils/clock";

function TimerModal(props: TimerModalProps) {
  const {
    onClose,
    hidden,
    timeInSeconds,
    setTimeInSeconds,
    isRunning,
    setIsRunning,
    onBreak,
    setOnBreak,
  } = props;
  const [studyDuration, setStudyDuration] = useState<string>("");
  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");
  const [playTime, setPlayTime] = useState<string | null>(null);
  const [stopTime, setStopTime] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null);

  const handleCloseModal = () => {
    onClose();
  };

  const handleSubmitStudyTime = () => {
    // eslint-disable-next-line no-alert
    if (!username) {
      alert("이름을 입력하세요.");
    }
  };

  if (hidden) {
    return null;
  }

  return (
    <div className={`ModalBackdrop ${hidden ? "hidden" : ""}`}>
      <div className="TimerModalContent">
        <button
          type="button"
          className="CloseButton"
          onClick={handleCloseModal}
        >
          Close
        </button>
        <main>
          <section className="CurrentTimeContainer">
            <Clock isModal />
          </section>
          <section className="TimeContainer">
            <p className="timer-text">{Math.floor(timeInSeconds / 3600)}</p>
            <span>:</span>
            <p className="timer-text">
              {Math.floor((timeInSeconds % 3600) / 60)}
            </p>
            <span>:</span>
            <p className="timer-text">{timeInSeconds % 60}</p>
          </section>
          <Controls
            setTimeInSeconds={setTimeInSeconds}
            setIsRunning={setIsRunning}
            isRunning={isRunning}
            setStudyDuration={setStudyDuration}
            onBreak={onBreak}
            setOnBreak={setOnBreak}
            breakStartTime={breakStartTime}
            setBreakStartTime={setBreakStartTime}
            setPlayTime={setPlayTime}
            setStopTime={setStopTime}
            startTime={startTime}
            setStartTime={setStartTime}
          />
          {playTime && <p className="PlayTime">{playTime}</p>}
          {stopTime && <p className="StopTime">{stopTime}</p>}
          <div className="StudyDurationContainer">{studyDuration}</div>
          {!isRunning && studyDuration && (
            <div className="SubmitSection">
              <label htmlFor="username">
                이름:
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                />
              </label>
              <button
                type="button"
                className="SubmitButton"
                onClick={handleSubmitStudyTime}
              >
                전송
              </button>
            </div>
          )}
        </main>
        <button
          type="button"
          className="CancelButton"
          onClick={handleCloseModal}
        >
          Cancel
        </button>
        <button type="button" className="OKButton" onClick={handleCloseModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default TimerModal;
