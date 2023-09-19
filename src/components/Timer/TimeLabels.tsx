import React from "react";
import "../../styles/modal.css";
import "../../styles/timer/timerModal.css";
import {TimeLabelsProps} from "../../types/Modal";

function TimeLabels({playTime, stopTime}: TimeLabelsProps) {
  return (
    <div className="TimeLabelsContainer">
      <div className="PlayTimeContainer">
        <div className="PlayLabel">공부 시작</div>
        {playTime && <p className="PlayTime">{playTime}</p>}
      </div>
      <div className="StopTimeContainer">
        <div className="StopLabel">공부 끝</div>
        {stopTime && <p className="StopTime">{stopTime}</p>}
      </div>
    </div>
  );
}

export default TimeLabels;
