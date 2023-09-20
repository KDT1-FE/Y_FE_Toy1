import { useEffect, useRef, useState } from "react";
import Button from "./Button";
import * as style from "./commuteModalStyle";

interface Props {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  startTime: Date | null;
  setStartTitme: React.Dispatch<React.SetStateAction<Date | null>>;
  endTime: Date | null;
  setEndTitme: React.Dispatch<React.SetStateAction<Date | null>>;
}

export default function CommuteModal({
  showModal,
  setShowModal,
  startTime,
  setStartTitme,
  endTime,
  setEndTitme,
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

  const onStartClick = () => {
    setStartTitme(time);
  };
  const onEndClick = () => {
    setEndTitme(time);
  };

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
            disabled={startTime ? false : true}
            onClick={onEndClick}
          />
        </style.BtnWrapper>
      </style.ModalWrapper>
    </style.Container>
  );
}
