import React from "react";
import { useState, useEffect } from "react";
import { styled } from "styled-components";
import swal from "sweetalert";
import { Button } from "antd";
import {
  ClockCircleOutlined,
  CheckOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";

// firebase
import { db, auth } from "../../libs/firebase";
import {
  addDoc,
  collection,
  doc,
  DocumentReference,
  getDoc,
  getDocs,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

interface UserData {
  name: string;
}

interface TimerProps {
  fontSize?: string;
}
const TimerApp = () => {
  const nowDate = new Date().toLocaleDateString("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    weekday: "narrow",
  });

  const user = auth.currentUser;
  const userUid = user ? user.uid : null;
  const userNameRef = userUid ? collection(db, "Users") : null;
  const userDoc = userNameRef ? doc(db, `Users/${userUid}`) : null;

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        if (userDoc) {
          const userDocSnap = await getDoc(
            userDoc as DocumentReference<UserData>,
          );
          const userData = userDocSnap.data() as UserData | undefined;
          const userName = userData ? userData.name || null : "";
          setUserName(userName);
          console.log("Fetched userName:", userName);

          // 쿠키를 사용하여 출퇴근 버튼 상태 불러오기
          const startWorkBtnCookieUserUid = `startWorkBtnClicked${userUid}`;
          const startWorkBtnStateFromCookie = getCookie(
            startWorkBtnCookieUserUid,
          );
          const finishWorkBtnCookieUserUid = `finishWorkBtnClicked${userUid}`;
          const finishWorkBtnStateFromCookie = getCookie(
            finishWorkBtnCookieUserUid,
          );

          if (
            startWorkBtnStateFromCookie !== "" &&
            finishWorkBtnStateFromCookie !== ""
          ) {
            setStartWorkBtnClicked(startWorkBtnStateFromCookie === "true");
            setFinishWorkBtnClicked(finishWorkBtnStateFromCookie === "true");
          }
        }
      } catch (error) {
        console.error("Error fetching userName or button states:", error);
      }
    };

    if (userDoc) {
      fetchUserName();
    }
  }, [userDoc, userUid]);

  const [nowTime, setNowTime] = useState<string>(
    new Date().toLocaleTimeString(),
  ); // 현재 시간 표시
  const [userName, setUserName] = useState<string | null>(""); // 현재 로그인한 유저의 이름을 관리
  const [startWorkTime, setStartWorkTime] = useState<Timestamp | null>(); // 출근 시간 기록
  const [finishWorkTime, setFinishWorkTime] = useState<Timestamp | null>(); // 퇴근 시간 기록
  const [startWorkBtnClicked, setStartWorkBtnClicked] =
    useState<boolean>(false); // 출근 버튼 클릭 가능 상태로 시작
  const [finishWorkBtnClicked, setFinishWorkBtnClicked] =
    useState<boolean>(false); // 퇴근 버튼 클릭 가능 상태로 시작
  const [clickedStartBtnText, setClickedStartBtnText] = useState<string>(""); // 출근 버튼이 클릭됐을 때 해당 시각을 버튼에 표시
  const [clickedFinishBtnText, setClickedFinishBtnText] = useState<string>(""); // 퇴근 버튼이 클릭됐을 때 해당 시각을 버튼에 표시
  const [workTimeDocId, setWorkTimeDocId] = useState<string | null>(""); // starttime 기록시 자동으로 생성된 문서 ID 저장
  const [passedTime, setPassedTime] = useState<number | null>(
    Number(localStorage.getItem("passedTime")) || 0,
  ); // 출근 버튼을 클릭한 순간부터 퇴근 버튼을 클릭할 때까지의 타이머 역할
  const [timeDiff, setTimeDiff] = useState<number | null>(0); // 출근 시간과 퇴근 시간을 대조하여 총 근무 시간을 계산 (Timestamp 형태가 숫자로 변환되어 있음)

  function setCookie(name: string, value: string, days: number) {
    const date = new Date();
    const endOfDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate(),
      23, // 23시간
      59, // 59분
      59, // 59초
      999, // 999밀리세컨드 (오늘 지나기 전까지)
    );
    const expires = "expires=" + endOfDay.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
  }

  function getCookie(name: string) {
    const cookieName = name + "=";
    const cookies = document.cookie.split("; ");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      if (cookie.indexOf(cookieName) === 0) {
        return cookie.substring(cookieName.length, cookie.length);
      }
    }
    return "";
  }

  const updateButtonStatesAndCookies = (
    startBtnClicked: boolean,
    finishBtnClicked: boolean,
    userUid: string | null,
  ) => {
    setStartWorkBtnClicked(startBtnClicked);
    setFinishWorkBtnClicked(finishBtnClicked);
    setClickedStartBtnText(startBtnClicked ? nowTime : "");
    setClickedFinishBtnText(finishBtnClicked ? nowTime : "");

    // 쿠키에 버튼 상태 저장
    if (userUid !== null) {
      setCookie(`startWorkBtnClicked${userUid}`, startBtnClicked.toString(), 1); //오늘 23시 59분 59초까지만 쿠키가 저장되도록 함
      setCookie(
        `finishWorkBtnClicked${userUid}`,
        finishBtnClicked.toString(),
        1,
      ); //오늘 23시 59분 59초까지만 쿠키가 저장되도록 함
    }
  };

  // 현재 시간을 출력해주는 일반 타이머
  const UpdateTime = () => {
    const nowTime = new Date().toLocaleTimeString();
    setNowTime(nowTime);
  };

  useEffect(() => {
    const interval = setInterval(UpdateTime, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  // 출근 시간을 기준으로 총 근무 시간을 출력해주는 타이머
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (startWorkBtnClicked && !finishWorkBtnClicked) {
      interval = setInterval(() => {
        setPassedTime((prevPassedTime) => (prevPassedTime ?? 0) + 1);
        localStorage.setItem("passedTime", String(passedTime));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [startWorkBtnClicked, finishWorkBtnClicked]);

  useEffect(() => {
    if (finishWorkBtnClicked) {
      localStorage.removeItem("passedTime");
    }
  }, [finishWorkBtnClicked]);

  const formatTotalWorkTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return `${hours}시간 ${minutes}분 ${remainingSeconds}초`;
  };

  const recordStartWork = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!userUid)
      return swal("Warning", "로그인부터 먼저 진행해주세요!", "warning");
    const startWorkTime = serverTimestamp() as Timestamp; // 현재 시간을 출근 시간으로 기록
    const workTimeSubCollectionRef = collection(
      db,
      `Users/${userUid}/worktime`,
    );

    // worktime이라는 하위 컬렉션이 존재하는지 확인
    const subCollectionSnapShot = await getDocs(workTimeSubCollectionRef);
    if (subCollectionSnapShot.empty) {
      await setDoc(
        doc(db, `Users/${userUid}`),
        { worktime: [] },
        { merge: true },
      );
    }
    const docRef = await addDoc(workTimeSubCollectionRef, {
      starttime: startWorkTime,
    });
    setWorkTimeDocId(docRef.id); // 자동으로 생성된 문서 ID 저장
    updateButtonStatesAndCookies(true, finishWorkBtnClicked, userUid); // 출근 시간 기록 후 버튼 비활성화
    setStartWorkTime(startWorkTime);
    setClickedStartBtnText(nowTime);
    const storedStartTime = nowTime; // 출근 시간 쿠키 저장용
    setCookie(`startWorkTime${userUid}`, storedStartTime.toString(), 1);
  };

  const recordFinishWork = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // 현재 시간을 퇴근 시간으로 기록

    if (!startWorkBtnClicked) {
      return swal(
        "Warning",
        "출근한 상태일 때만 퇴근 기록이 가능합니다!",
        "warning",
      );
    }
    if (workTimeDocId) {
      const finishWorkTime = serverTimestamp();

      // 출근 시간이 저장된 동일 문서 ID를 참조
      const workTimeDocRef = doc(
        db,
        `Users/${userUid}/worktime/${workTimeDocId}`,
      );

      try {
        // 퇴근 시간을 해당 문서 ID에 업데이트
        await updateDoc(workTimeDocRef, {
          finishtime: finishWorkTime,
        });
        console.log(workTimeDocId);
        const workTimeDocSnapshot = await getDoc(workTimeDocRef);
        const workTimeData = workTimeDocSnapshot.data();
        const actualStartWorkTime = workTimeData?.starttime;
        const actualFinishWorkTime = workTimeData?.finishtime;
        console.log(actualStartWorkTime.seconds);
        console.log(actualStartWorkTime.nanoseconds);

        // 총 근무시간 산출
        if (actualFinishWorkTime && actualStartWorkTime) {
          const startTimeMillis = actualStartWorkTime.toDate().getTime();
          const finishTimeMillis = actualFinishWorkTime.toDate().getTime();
          const timeDiff = (finishTimeMillis - startTimeMillis) / 1000; // 밀리세컨드를 초 단위로 변환
          setTimeDiff(timeDiff);

          updateButtonStatesAndCookies(startWorkBtnClicked, true, userUid); // 퇴근 시간 기록 후 버튼 비활성화
          setClickedFinishBtnText(nowTime);
          const storedFinishTime = nowTime; // 퇴근 시간 쿠키 저장용
          setCookie(`finishWorkTime${userUid}`, storedFinishTime.toString(), 1);
          if (timeDiff !== null && timeDiff !== undefined) {
            setCookie(`totalWorkTime${userUid}`, timeDiff.toString(), 1);
          } else {
            console.error("timeDiff is null or undefined");
          }
        }
        console.log("퇴근 처리가 정상적으로 완료되었습니다!");
      } catch (error) {
        console.error("퇴근 처리에 실패했습니다", error);
      }
    } else {
      console.error("worktimeDocId is null");
    }
  };

  const startWorkTimeCookie = `startWorkTime${userUid}`;
  const startWorkTimeFromCookie = getCookie(startWorkTimeCookie);
  const finishWorkTimeCookie = `finishWorkTime${userUid}`;
  const finishWorkTimeFromCookie = getCookie(finishWorkTimeCookie);
  const timeDiffCookie = `totalWorkTime${userUid}`;
  const timeDiffFromCookie = Math.floor(Number(getCookie(timeDiffCookie)));

  return (
    <form>
      {userUid ? `환영합니다. ${userName} 님!` : "환영합니다."}
      <TimerAlign>
        <div>
          <div>
            <TimerText>TODAY {nowDate}</TimerText>
          </div>
          <div>
            <TimerText fontSize="2.3rem">
              <ClockCircleOutlined />
              &nbsp;
              {nowTime}
            </TimerText>
          </div>
        </div>
      </TimerAlign>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <CustomButton
          type="primary"
          size="large"
          onClick={recordStartWork}
          disabled={startWorkBtnClicked}
        >
          {!startWorkBtnClicked ? (
            <>
              <CheckOutlined />
              &nbsp;출근
            </>
          ) : (
            <>
              <CheckOutlined />
              &nbsp;출근!
              <br />
              {startWorkTimeFromCookie}
            </>
          )}
        </CustomButton>
        <span>&nbsp;|&nbsp;</span>
        <CustomButton
          type="default"
          size="large"
          onClick={recordFinishWork}
          disabled={finishWorkBtnClicked}
        >
          {!finishWorkBtnClicked ? (
            <>
              <PoweroffOutlined />
              &nbsp;퇴근
            </>
          ) : (
            <>
              <PoweroffOutlined />
              &nbsp;퇴근!
              <br />
              {finishWorkTimeFromCookie}
            </>
          )}
        </CustomButton>
      </div>
      {startWorkBtnClicked && !finishWorkBtnClicked && (
        <TimerText fontSize="1.2rem" style={{ lineHeight: 2, fontWeight: 400 }}>
          좋은 하루 보내세요😊
        </TimerText>
      )}
      {startWorkBtnClicked && finishWorkBtnClicked && (
        <TimerText fontSize="1.2rem" style={{ lineHeight: 2, fontWeight: 400 }}>
          오늘도 수고하셨습니다!👍
        </TimerText>
      )}
      {(startWorkBtnClicked || finishWorkBtnClicked) && (
        <div>
          {passedTime !== null &&
          passedTime !== undefined &&
          passedTime !== 0 ? (
            <>
              오늘 총 근무시간은 {formatTotalWorkTime(passedTime)}입니다.
              <br />
            </>
          ) : (
            <>
              오늘 총 근무시간은 {formatTotalWorkTime(timeDiffFromCookie)}
              입니다.
              <br />
            </>
          )}
        </div>
      )}
    </form>
  );
};

const CustomButton = styled(Button)`
  && {
    width: 130px;
    height: 60px;
    font-size: ${(props) => (props.disabled ? "0.9rem" : "1.5rem")};
    white-space: pre-wrap;
    text-overflow: ellipsis;
    text-align: center;
    transition: none;
  }

  &&.ant-btn-primary {
    background-color: ${(props) => (props.disabled ? "gray" : "#3956A3")};
    color: ${(props) => (props.disabled ? "#5F5F5F" : "white")};
  }

  &&.ant-btn-default {
    background-color: ${(props) => (props.disabled ? "gray" : "#E1E1E1")};
    color: ${(props) => (props.disabled ? "#5F5F5F" : "white")};
  }
`;

const TimerText = styled.div<TimerProps>`
  font-size: ${(props) => props.fontSize || "1.5rem"};
`;

const TimerAlign = styled.div`
  style={
  display: "flex",
  flexDirection: "column",
  justifyContent: "right",
  alignItems: "center"}`;

export default TimerApp;
