import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import * as style from "./commuteModalStyle";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/firebase/firebase";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: Date | null;
  setStartTime: React.Dispatch<React.SetStateAction<Date | null>>;
  endTime: Date | null;
  setEndTime: React.Dispatch<React.SetStateAction<Date | null>>;
  workingHours: number;
  workingMinutes: number;
  setWorkedHours: React.Dispatch<React.SetStateAction<number>>;
  setWorkedMinutes: React.Dispatch<React.SetStateAction<number>>;
  disabledEndBtn: boolean;
  setDisabledEndBtn: React.Dispatch<React.SetStateAction<boolean>>;
  uid: string | undefined;
}

export default function CommuteModal({
  showModal,
  setShowModal,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  workingHours,
  workingMinutes,
  setWorkedHours,
  setWorkedMinutes,
  disabledEndBtn,
  setDisabledEndBtn,
  uid,
}: Props) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const node = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      // 모달이 열려 있고 모달의 바깥쪽을 눌렀을 때 창 닫기
      if (
        showModal &&
        node.current &&
        !node.current.contains(e.target as Node)
      ) {
        setShowModal(false);
      }
    };

    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showModal]);

  const onStartClick = async () => {
    if (uid) {
      await setDoc(doc(db, "Commute", uid), {
        start: time,
      });
    }
    setStartTime(time);
    setDisabledEndBtn(false);
  };
  const onEndClick = async () => {
    if (uid) {
      await setDoc(
        doc(db, "Commute", uid),
        {
          end: time,
          workingHours: workingHours,
          workingMinutes: workingMinutes,
        },
        { merge: true },
      );
    }
    setEndTime(time);
    setDisabledEndBtn(true);
    setWorkedHours(workingHours);
    setWorkedMinutes(workingMinutes);
  };

  window.addEventListener("keydown", (e) => {
    e.key === "Escape" && setShowModal(false);
  });

  return (
    <style.Container>
      <style.ModalWrapper ref={node}>
        <style.Xicon
          src="/images/free-icon-x.png"
          onClick={() => setShowModal(false)}
        ></style.Xicon>
        <style.Title>출퇴근 처리</style.Title>
        <style.TimeBox>
          <style.Date>
            {time.getFullYear()}.{time.getMonth() + 1}.{time.getDate()}
          </style.Date>
          <style.NowTime>{time.toLocaleTimeString()}</style.NowTime>
        </style.TimeBox>

        <style.CommuteTimeWrapper>
          <style.CommuteTime>
            오늘의 출근 시간:{" "}
            {startTime ? startTime.toLocaleTimeString() : "--:--:--"}
          </style.CommuteTime>
          <style.CommuteTime>
            오늘의 퇴근 시간:{" "}
            {endTime ? endTime.toLocaleTimeString() : "--:--:--"}
          </style.CommuteTime>
        </style.CommuteTimeWrapper>

        <style.BtnWrapper>
          <Button
            text={"출근하기"}
            padding={"0.3125rem 0.75rem"}
            disabled={startTime ? true : false}
            onClick={onStartClick}
          />
          <Button
            text={"퇴근하기"}
            padding={"0.3125rem 0.75rem"}
            disabled={disabledEndBtn}
            onClick={onEndClick}
          />
        </style.BtnWrapper>
      </style.ModalWrapper>
    </style.Container>
  );
}
