import React from "react";
import {Link} from "react-router-dom";
import Clock from "../../utils/clock";
import "../../styles/Header.css";

function Header() {
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
              <button type="button" className="Timer">
                Timer
              </button>
            </li>
            <li>
              <h2 id="clock">
                00:00
                <Clock />
              </h2>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
