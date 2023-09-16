import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import Clock from "../../utils/clock";
import "../../styles/Header.css";
import Modal from "../Modal/Modal";
import TimerModal from "../Timer/TimerModal";
import useModal from "../../hooks/useModal";
import calculateTimer from "../../utils/timer";

function Header() {
  const {isOpen, toggle} = useModal();
  const [timeInSeconds, setTimeInSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timerArray, setTimerArray] = useState<Array<number | string>>([]);

  useEffect(() => {
    const timeArray: Array<number | string> = calculateTimer(timeInSeconds);
    setTimerArray(timeArray);
  }, [timeInSeconds]);

  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTimeInSeconds((prev: number) => prev + 1);
      }, 1000);

      return () => clearInterval(interval);
    }
    return undefined;
  }, [isRunning]);

  return (
    <div className="Main">
      <header className="HeaderMain">
        <div className="Logo">
          <h1>
            <Link to="/" className="SubListMain">
              Yanolja Tech School
            </Link>
          </h1>
        </div>
        <nav className="NavbarWrap">
          <ul className="List">
            <li>
              <Link to="/wiki" className="SubList">
                Wiki
              </Link>
            </li>
            <li>
              <Link to="/gallery" className="SubList">
                Gallery
              </Link>
            </li>
            <li>
              <button type="button" className="Timer" onClick={toggle}>
                Timer
              </button>
            </li>
            <li>
              <Clock />
            </li>
          </ul>
        </nav>
      </header>
      <Modal isOpen={isOpen} onClose={toggle}>
        <TimerModal
          onClose={toggle}
          hidden={!isOpen}
          timeInSeconds={timeInSeconds}
          setTimeInSeconds={setTimeInSeconds}
          isRunning={isRunning}
          setIsRunning={setIsRunning}
          timerArray={timerArray}
          toggle={toggle}
        />
      </Modal>
    </div>
  );
}

export default Header;
