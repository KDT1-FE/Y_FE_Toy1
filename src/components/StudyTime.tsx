import React, { useEffect, useState } from "react";

interface StudyTimeProps {
  isStudying: boolean;
  studyStartTime: number | null;
  toggleStudyStatus: () => void;
}

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>("00:00:00");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, "0");
      const minutes = String(now.getMinutes()).padStart(2, "0");
      const seconds = String(now.getSeconds()).padStart(2, "0");
      setCurrentTime(`${hours}:${minutes}:${seconds}`);
    };

    const intervalId = setInterval(updateTime, 1000);

    // 컴포넌트가 언마운트될 때 clearInterval을 호출하여 인터벌을 정리합니다.
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div>
      <p>{currentTime}</p>
    </div>
  );
};

const StudyTime: React.FC<StudyTimeProps> = ({
  isStudying,
  studyStartTime,
  toggleStudyStatus,
}) => {
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isStudying && studyStartTime) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - studyStartTime;
        setElapsedTime(elapsedMilliseconds);
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isStudying, studyStartTime]);

  return (
    <div>
      <div>
        <Clock />
        <p>현재 공부 시간: {formatTime(elapsedTime)}</p>
        <span className={isStudying ? "badge studying" : "badge"}>
          {isStudying ? "공부 중" : "일시 중지"}
        </span>
      </div>
      <button className="btn" onClick={toggleStudyStatus}>
        {isStudying ? "공부 종료" : "공부 시작"}
      </button>
    </div>
  );
};

const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(
    2,
    "0"
  )}:${String(seconds % 60).padStart(2, "0")}`;
};

export default StudyTime;
