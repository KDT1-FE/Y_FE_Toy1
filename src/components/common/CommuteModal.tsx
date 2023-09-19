import Button from "./Button";
import * as style from "./commuteModalStyle";

interface Props {
  onCommuteClick: () => void;
}

export default function CommuteModal({ onCommuteClick }: Props) {
  return (
    <style.Container>
      <style.ModalWrapper>
        <style.Xicon
          src="/images/free-icon-x.png"
          onClick={onCommuteClick}
        ></style.Xicon>
        <style.Title>출퇴근 처리</style.Title>
        <style.TimeBox>
          <style.Date>2023.09.08</style.Date>
          <style.NowTime>19:00:00</style.NowTime>
        </style.TimeBox>

        <style.CommuteTimeWrapper>
          <style.CommuteTime>오늘의 출근 시간 : 08:00:01</style.CommuteTime>
          <style.CommuteTime>오늘의 퇴근 시간 : --:--:--</style.CommuteTime>
        </style.CommuteTimeWrapper>

        <style.BtnWrapper>
          <Button text={"출근하기"} padding={"0.3125rem 0.75rem"} />
          <Button text={"퇴근하기"} padding={"0.3125rem 0.75rem"} />
        </style.BtnWrapper>
      </style.ModalWrapper>
    </style.Container>
  );
}
