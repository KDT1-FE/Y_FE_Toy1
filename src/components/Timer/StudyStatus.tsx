import React, {useEffect} from "react";
import "../../styles/Modal.css";
import "../../styles/TimerModal.css";
import {StudyStatusProps} from "../../types/Modal";

function StudyStatus({
  statusText,
  setStatusText,
  onBreak,
}: StudyStatusProps & {
  setStatusText: React.Dispatch<React.SetStateAction<string | null>>;
  onBreak: boolean;
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

  if (statusText === null) {
    return null;
  }

  const statusClassName = `StatusContainer ${onBreak ? "onBreak" : ""}`;

  return <div className={statusClassName}>{statusText}</div>;
}

export default StudyStatus;
