import React, {useState} from "react";
import {Link} from "react-router-dom";
import "../styles/header.css";
import Modal from "./Modal";
import TimerModal from "./Timer/TimerModal";
import useModal from "../hooks/useModal";
import useTimer from "../hooks/useTimer";
import logoImage from "../assets/images/Logo.png";

function Header() {
  const {isOpen, toggle} = useModal();
  const [statusText, setStatusText] = useState<string | null>(null);
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
          <Link to="/" className="SubListMain">
            <img src={logoImage} alt="로고" className="LogoImg" />
          </Link>
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
              <Link to="/ranking" className="SubList">
                Ranking
              </Link>
            </li>
            <li>
              <button type="button" className="Timer" onClick={toggle}>
                Timer
              </button>
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
          statusText={statusText}
          setStatusText={setStatusText}
        />
      </Modal>
    </div>
  );
}

export default Header;
