import Button from "./Button";
import * as style from "./headerStyle";
import { useLocation } from "react-router-dom";
import CommuteModal from "./CommuteModal";
import { useEffect, useState } from "react";

export default function Header() {
  const [showModal, setShowModal] = useState(false);
  const onCommuteClick = () => {
    setShowModal(!showModal);
  };
  const [startTime, setStartTitme] = useState<Date | null>(null);
  const [endTime, setEndTitme] = useState<Date | null>(null);

  const [workingHours, setWorkingHours] = useState<number>();
  const [workingMinutes, setWorkingMinutes] = useState<number>();
  useEffect(() => {
    if (startTime) {
      const id = setInterval(() => {
        setWorkingHours(new Date().getHours() - startTime.getHours());
        setWorkingMinutes(new Date().getMinutes() - startTime.getMinutes());
      }, 1000);
      return () => clearInterval(id);
    }
  }, [startTime]);

  const location = useLocation();
  if (location.pathname === "/login") return null;
  return (
    <>
      <style.Container>
        <style.Top>
          <style.Wrapper>
            <style.Logo>9굴 WIKI</style.Logo>
          </style.Wrapper>
          <style.Wrapper>
            <style.UserName>아무개님</style.UserName>
            {startTime && (
              <style.WorkingTime>
                {String(workingHours).padStart(2, "0")}:
                {String(workingMinutes).padStart(2, "0")} 근무 중
              </style.WorkingTime>
            )}
            <Button
              text={"통근 관리"}
              margin={"0rem 1.25rem 0rem 0rem"}
              padding={"0.3125rem 0.75rem"}
              onClick={onCommuteClick}
            />
            <style.LogoutBtn>Logout</style.LogoutBtn>
          </style.Wrapper>
        </style.Top>
        <style.Bottom>
          <style.Wrapper>
            <style.NavSpan to={"/"}>HOME</style.NavSpan>
          </style.Wrapper>
          <style.Wrapper>
            <style.NavSpan to={"/wiki"} margin_r={"1.5625rem"}>
              WIKI
            </style.NavSpan>
            <style.NavSpan to={"/gallery"}>GALLERY</style.NavSpan>
          </style.Wrapper>
        </style.Bottom>
      </style.Container>
      {showModal && (
        <CommuteModal
          showModal={showModal}
          setShowModal={setShowModal}
          startTime={startTime}
          setStartTitme={setStartTitme}
          endTime={endTime}
          setEndTitme={setEndTitme}
        />
      )}
    </>
  );
}
