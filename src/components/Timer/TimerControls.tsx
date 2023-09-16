import React from "react";
import {ControlsProps} from "../../types/Modal";
import "../../styles/TimerModal.css";

function Controls(props: ControlsProps) {
  const {setTimeInSeconds, setIsRunning, isRunning} = props;

  const handlePlayButton = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const handleStopButton = () => {
    if (isRunning) {
      setIsRunning(false);
    }
  };

  const handleResetButton = () => {
    setIsRunning(false);
    setTimeInSeconds(0);
  };

  return (
    <section className="ControlsContainer">
      <button type="button" className="PlayButton" onClick={handlePlayButton}>
        Play
      </button>
      <button type="button" className="StopButton" onClick={handleStopButton}>
        Stop
      </button>
      <button type="button" className="ResetButton" onClick={handleResetButton}>
        Reset
      </button>
    </section>
  );
}

export default Controls;
