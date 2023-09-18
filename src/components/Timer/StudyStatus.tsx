import React, {useEffect} from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import {StudyStatusProps} from "../../types/Modal";

function StudyStatus({
  statusText,
  setStatusText,
}: StudyStatusProps & {
  setStatusText: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  useEffect(() => {
    const savedStatusText = localStorage.getItem("statusText");
    if (savedStatusText) {
      setStatusText(savedStatusText);
    }
  }, [setStatusText]);

  useEffect(() => {
    if (statusText !== null) {
      localStorage.setItem("statusText", statusText);
    } else {
      localStorage.removeItem("statusText");
    }
  }, [statusText]);

  return <div className="StatusTextContainer">{statusText}</div>;
}

export default StudyStatus;
