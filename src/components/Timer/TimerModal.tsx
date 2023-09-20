import React, {useState} from "react";
import "../../styles/modal.css";
import "../../styles/timer/timerModal.css";
import {TimerModalProps} from "../../types/Modal";
import Controls from "./TimerControls";
import Clock from "./Clock";
import TimeLabels from "./TimeLabels";
import StudyStatus from "./StudyStatus";
import {
  postData,
  sortRanking,
  getRankingDocsToArr,
  saveRankingInBrowser,
  RANKING_URL,
  getTimeFromBrowser,
  calculateTimer,
} from "../../utils/timerAndRanking";

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
  const studyDurationFromSession = getTimeFromBrowser();

  const handleCloseModal = () => {
    onClose();
  };

  const timeArray = studyDurationFromSession
    ? calculateTimer(studyDurationFromSession)
    : null;

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
            <StudyStatus
              statusText={statusText}
              setStatusText={setStatusText}
              onBreak={onBreak}
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
            timeInSeconds={timeInSeconds}
          />

          <div className="StudyDurationContainer">
            총 공부 시간 :
            {timeArray
              ? `${timeArray[0]}시 ${timeArray[1]}분 ${timeArray[2]}초`
              : "시간을 불러올 수 없습니다."}
          </div>
          {!isRunning && studyDuration && (
            <div className="SubmitSection">
              <div className="input">
                <label htmlFor="username">
                  <input
                    type="text"
                    id="UserName"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="이름을 입력하세요"
                  />
                </label>
              </div>
              <button
                type="button"
                className="SubmitButton"
                onClick={async () => {
                  await postData(username);
                  await getRankingDocsToArr().then(doc => {
                    const sortedData = sortRanking(doc);
                    saveRankingInBrowser(sortedData);
                  });
                  window.location.replace(RANKING_URL);
                }}
              >
                Submit
              </button>
              <p className="SubmitDescription">내 공부 시간 랭킹에 기록하기</p>
            </div>
          )}
        </main>
        <button type="button" className="OKButton" onClick={handleCloseModal}>
          OK
        </button>
      </div>
    </div>
  );
}

export default TimerModal;
