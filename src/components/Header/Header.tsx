import React from "react";
import {Link} from "react-router-dom";
import "../../styles/Header.css";
import Modal from "../Modal/Modal";
import TimerModal from "../Timer/TimerModal";
import useModal from "../../hooks/useModal";

function Header() {
  const {isOpen, toggle} = useModal();

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
          </ul>
        </nav>
      </header>
      <Modal isOpen={isOpen} onClose={toggle}>
        <TimerModal onClose={toggle} />
      </Modal>
    </div>
  );
}

export default Header;
