import React from "react";
import {Link} from "react-router-dom";
import Clock from "../../utils/clock";
import "../../styles/Header.css";
import Modal from "../Modal/Modal";
import TimerModal from "../Timer/TimerModal";
import useModal from "../../hooks/useModal";
import useTimer from "../../hooks/useTimer";

function Header() {
  const {isOpen, toggle} = useModal();
  const {
    timeInSeconds,
    setTimeInSeconds,
    isRunning,
    setIsRunning,
    onBreak,
    setOnBreak,
    timerArray,
    playTime,
    setPlayTime,
    stopTime,
    setStopTime,
    startTime,
    setStartTime,
  } = useTimer();

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
          onBreak={onBreak}
          setOnBreak={setOnBreak}
          playTime={playTime}
          setPlayTime={setPlayTime}
          stopTime={stopTime}
          setStopTime={setStopTime}
          startTime={startTime}
          setStartTime={setStartTime}
        />
      </Modal>
    </div>
  );
}

export default Header;
