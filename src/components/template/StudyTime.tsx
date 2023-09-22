import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { Button, ButtonWhite } from "./Button";
import { useContext } from "react";
import { AuthContext } from "provider/userContext";
import { increment, doc, updateDoc } from "firebase/firestore";
import { SynchroClassAndAlert } from "utils/class";
import { db } from "../../firebase";
import Swal from "sweetalert2";
import { IsMobile } from "utils/mediaQuery";

const StyledClock = styled.p`
  font-variant-numeric: tabular-nums;
`;

const getCurrentTime = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<string>(getCurrentTime());

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
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
  studyStartTime?: number | null;
  toggleStudyStatus: () => void;
  onIsStudyingChange: (isStudying: boolean) => void;
  setStudyStartTime: (time: number) => void;
}

const StudyTime: React.FC<StudyTimeProps> = ({
  isStudying,
  studyStartTime,
  toggleStudyStatus,
  onIsStudyingChange,
  setStudyStartTime,
}) => {
  const navigate = useNavigate();
  const user = useContext(AuthContext);
  const [elapsedTime, setElapsedTime] = useState<number>(0);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined = undefined;

    if (isStudying && studyStartTime) {
      interval = setInterval(() => {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - studyStartTime!;
        setElapsedTime(elapsedMilliseconds);
      }, 1000);
    }

    return () => {
      if (interval !== undefined) {
        clearInterval(interval);
      }
    };
  }, [isStudying, studyStartTime]);

  const handleStartStudy = () => {
    //로그인 했을 때만
    if (user && user.uid) {
      if (!isStudying) {
        const startTime = new Date().getTime();
        setStudyStartTime(startTime);
        toggleStudyStatus();
      } else {
        toggleStudyStatus();

        if (studyStartTime) {
          // 공부 종료 시에만 실행
          const endTime = new Date().getTime();
          const elapsedMinutes =
            Math.floor((endTime - studyStartTime) / 60000) + 1;

          const userDocRef = doc(db, "user", user.uid);
          updateDoc(userDocRef, {
            studyTime: increment(elapsedMinutes),
          }).then(() => {
            // 현재 firestore에 변경된 studytime을 확인해, database에 저장된 class 값과 비교하고 달라졌다면 alert 창을 띄움
            SynchroClassAndAlert(user);
            setElapsedTime(0);
          });
        }
      }
    } else {
      Swal.fire({
        icon: "warning",
        title: "로그인해야 이용할 수 있습니다. 로그인 하시겠습니까?",
        confirmButtonText: "확인",
        confirmButtonColor: "#ED234B",
      }).then((res) => {
        if (res.isConfirmed) {
          navigate("/login");
        }
      });
    }
  };

  return (
    <div>
      <SectionTitle>
        학습시간 기록
        {IsMobile() ? <MobileCounterBadge show={isStudying} /> : null}
      </SectionTitle>
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
          {IsMobile() ? null : (
            <CounterBadge show={isStudying}>
              {isStudying ? "기록 중" : null}
            </CounterBadge>
          )}
        </CounterData>
      </CounterWrap>
      <Button onClick={handleStartStudy}>
        {isStudying ? "공부 종료" : "공부 시작"}
      </Button>
    </div>
  );
};

const formatTime = (milliseconds: number) => {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${String(hours).padStart(2, "0")}:
  ${String(minutes % 60).padStart(2, "0")}:
  ${String(seconds % 60).padStart(2, "0")}`;
};

const SectionTitle = styled.h4`
  font-size: 28px;
  font-weight: 700;
  margin-top: 0;
  margin-bottom: 60px;
  @media only screen and (max-width: 600px) {
    h4 {
      font-size: 18px;
    }
  }
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
const CounterData = styled.p`
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

const MobileCounterBadge = styled.div<{ show: boolean }>`
  position: absolute;
  top: 33px;
  right: 40px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${(props) => (props.show ? "var(--main-color)" : "#fff")};
`;
export default StudyTime;
