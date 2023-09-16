import React from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import {TimerModalProps} from "../../types/Modal";
import Controls from "./TimerControls";
import Clock from "../../utils/clock";

export default function TimerModal({
  onClose,
  hidden,
  timeInSeconds,
  setTimeInSeconds,
  isRunning,
  setIsRunning,
}: TimerModalProps) {
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
            <Clock />
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
          />
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
