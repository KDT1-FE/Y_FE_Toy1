import Button from "./Button";
import * as style from "./headerStyle";
import { useLocation } from "react-router-dom";
import CommuteModal from "./CommuteModal";
import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { Props } from "../../App";
import { deleteDoc, doc, getDoc } from "firebase/firestore";
import convertTimestampToDate from "@/utils/convertTimestampToDate";

export default function Header({ uid, email }: Props) {
  const [showModal, setShowModal] = useState(false);
  const onCommuteClick = () => {
    setShowModal(!showModal);
  };
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);

  const [workingHours, setWorkingHours] = useState<number>(0);
  const [workingMinutes, setWorkingMinutes] = useState<number>(0);
  useEffect(() => {
    if (startTime) {
      const id = setInterval(() => {
        const diffMSec = new Date().getTime() - startTime.getTime();
        const diffHour = Math.floor(diffMSec / (60 * 60 * 1000));
        const diffMin = Math.floor((diffMSec / (60 * 1000)) % 60);
        setWorkingHours(diffHour);
        setWorkingMinutes(diffMin);
      }, 1000);
      return () => clearInterval(id);
    }
  }, [startTime]);

  const logout = async () => {
    await signOut(auth);
    window.location.replace("/login");
  };

  const [workedHours, setWorkedHours] = useState<number>(0);
  const [workedMinutes, setWorkedMinutes] = useState<number>(0);

  const isSameDate = (date1: Date, date2: Date) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  const [disabledEndBtn, setDisabledEndBtn] = useState<boolean>(true);

  useEffect(() => {
    const getCommuteTime = async () => {
      if (uid) {
        const docRef = doc(db, "Commute", uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          if (docSnap.data().start) {
            const startData = convertTimestampToDate(docSnap.data().start);
            if (isSameDate(startData!, new Date())) {
              setStartTime(convertTimestampToDate(docSnap.data().start));
              setDisabledEndBtn(false);
            } else {
              await deleteDoc(doc(db, "Commute", uid));
            }
            if (docSnap.data().end) {
              const endData = convertTimestampToDate(docSnap.data().end);
              if (isSameDate(endData!, new Date())) {
                setEndTime(convertTimestampToDate(docSnap.data().end));
                setWorkedHours(docSnap.data().workingHours);
                setWorkedMinutes(docSnap.data().workingMinutes);
                setDisabledEndBtn(true);
              } else {
                await deleteDoc(doc(db, "Commute", uid));
              }
            }
          }
        }
      }
    };
    getCommuteTime();
  }, [uid]);

  const location = useLocation();
  if (location.pathname === "/login") return null;
  return (
    <>
      <style.Container>
        <style.Top>
          <style.Wrapper>
            <style.Logo to={"/"}>9굴 WIKI</style.Logo>
          </style.Wrapper>
          <style.Wrapper>
            <style.UserName>{email}</style.UserName>
            {startTime && !endTime ? (
              <style.WorkingTime>
                {String(workingHours).padStart(2, "0")}:
                {String(workingMinutes).padStart(2, "0")} 근무 중
              </style.WorkingTime>
            ) : (
              startTime &&
              endTime && (
                <style.WorkedTime>
                  {String(workedHours).padStart(2, "0")}:
                  {String(workedMinutes).padStart(2, "0")} 근무 완료
                </style.WorkedTime>
              )
            )}
            <Button
              text={"통근 관리"}
              margin={"0rem 1.25rem 0rem 0rem"}
              padding={"0.3125rem 0.75rem"}
              onClick={onCommuteClick}
            />
            <style.LogoutBtn onClick={logout}>LOGOUT</style.LogoutBtn>
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
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
          workingHours={workingHours}
          workingMinutes={workingMinutes}
          setWorkedHours={setWorkedHours}
          setWorkedMinutes={setWorkedMinutes}
          disabledEndBtn={disabledEndBtn}
          setDisabledEndBtn={setDisabledEndBtn}
          uid={uid}
        />
      )}
    </>
  );
}
