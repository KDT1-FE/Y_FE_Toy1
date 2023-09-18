import React, {useState} from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import {TimerModalProps} from "../../types/Modal";
import Controls from "./TimerControls";
import Clock from "../../utils/clock";
import TimeLabels from "./TimeLabels";
import StudyStatus from "./StudyStatus";

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
    playTime,
    stopTime,
    startTime,
    setPlayTime,
    setStopTime,
    setStartTime,
    setStatusText,
    statusText,
  } = props;

  const [studyDuration, setStudyDuration] = useState<string>("");
  const [breakStartTime, setBreakStartTime] = useState<number | null>(null);
  const [username, setUsername] = useState<string>("");

  const handleCloseModal = () => {
    onClose();
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
            <StudyStatus
              statusText={statusText}
              setStatusText={setStatusText}
            />
          </section>
          <section className="TimeContainer">
            <p className="TimerText">{Math.floor(timeInSeconds / 3600)}</p>
            <span>:</span>
            <p className="TimerText">
              {Math.floor((timeInSeconds % 3600) / 60)}
            </p>
            <span>:</span>
            <p className="TimerText">{timeInSeconds % 60} </p>
            <p className="TimerSpace"> </p>
            <p className="TimerText"> 동안 공부 중</p>
          </section>
          <TimeLabels playTime={playTime} stopTime={stopTime} />
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
            statusText={statusText}
            setStatusText={setStatusText}
          />
          {/* <TimeLabels playTime={playTime} stopTime={stopTime} />  */}
          <div className="StudyDurationContainer">{studyDuration}</div>
          {!isRunning && studyDuration && (
            <div className="SubmitSection">
              <div className="input">
                <label htmlFor="username">
                  <input
                    type="text"
                    id="username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                </label>
              </div>
              <button
                type="button"
                className="SubmitButton"
                // onClick={handleSubmitStudyTime}
              >
                Submit
              </button>
            </div>
          )}
        </main>
        {/* <button
          type="button"
          className="CancelButton"
          onClick={handleCloseModal}
        >
          Cancel
        </button> */}
        <button type="button" className="OKButton" onClick={handleCloseModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default TimerModal;
