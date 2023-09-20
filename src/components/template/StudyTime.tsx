import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, ButtonWhite } from "./Button";
import { useContext } from "react";
import { AuthContext } from "provider/userContext";
import { increment, doc, updateDoc } from "firebase/firestore";
import { SynchroClassAndAlert } from "utils/class";
import { db } from "../../firebase";

const StyledClock = styled.p`
  font-variant-numeric: tabular-nums;
`;

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

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return <StyledClock>{currentTime}</StyledClock>;
};

interface StudyTimeProps {
  isStudying: boolean;
  studyStartTime: number | null;
  toggleStudyStatus: () => void;
}

const StudyTime: React.FC<StudyTimeProps> = ({ isStudying, studyStartTime, toggleStudyStatus }) => {
  const user = useContext(AuthContext);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isStudying && studyStartTime) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - studyStartTime;
        setElapsedTime(elapsedMilliseconds);
      }, 1000);
    } else {
      if (studyStartTime) {
        const endTime = new Date().getTime();
        const elapsedMinutes = Math.floor((endTime - studyStartTime) / 60000);

        if (user && user.uid) {
          const userDocRef = doc(db, "user", user.uid);
          updateDoc(userDocRef, {
            studyTime: increment(elapsedMinutes),
          }).then(() => {
            // 현재 firestore에 변경된 studytime을 확인해, database에 저장된 class 값과 비교하고 달라졌다면 alert 창을 띄움
            SynchroClassAndAlert(user);
          });
        }
      }
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isStudying, studyStartTime]);

  return (
    <div>
      <SectionTitle>학습시간 기록</SectionTitle>
      <CounterWrap>
        <CounterLabel>현재시각</CounterLabel>
        <CounterData>
          <Clock />
        </CounterData>
      </CounterWrap>
      <CounterWrap>
        <CounterLabel>학습시간</CounterLabel>
        <CounterData>
          {formatTime(elapsedTime)}
          <CounterBadge show={isStudying}>{isStudying ? "기록 중" : null}</CounterBadge>
        </CounterData>
      </CounterWrap>
      <Button onClick={toggleStudyStatus}>{isStudying ? "공부 종료" : "공부 시작"}</Button>
    </div>
  );
};

const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}:${String(seconds % 60).padStart(
    2,
    "0"
  )}`;
};

const SectionTitle = styled.div`
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 60px;
`;
const CounterWrap = styled.div`
  margin: 0 auto;
  display: flex;
  margin-bottom: 30px;
  justify-content: center;
  * {
    margin: 0;
    font-size: 20px;
  }
`;

const CounterLabel = styled.p`
  font-size: 20px;
  margin-right: 24px;
`;
const CounterData = styled.div`
  font-weight: 700;
  position: relative;
  font-variant-numeric: tabular-nums;
`;

const CounterBadge = styled.span<{ show: boolean }>`
  position: absolute;
  top: 0;
  right: -80px;
  border-radius: 16px;
  background: var(--main-color);
  padding: 5px 10px;
  color: #fff;
  font-size: 12px;
  display: ${(props) => (props.show ? "inline-block" : "none")};
`;
export default StudyTime;
