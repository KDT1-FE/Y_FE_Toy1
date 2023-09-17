import React, { useState } from "react";

import {
  NavBar,
  NavCategoryBox,
  NavCategoryLink,
  NavModalBox,
  NavTitle,
} from "../styled/Common/NavBar";
import Calendar from "../assets/img/Calendar.svg";
import Todo from "../assets/img/Todo.svg";
import Profile from "../assets/img/Profile.svg";
import ProfileModal from "../pages/MainPage/ProfileModal";
import { ProfileBtn } from "../styled/MainPage/ProfileModal";

export default function Navigation() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <NavBar>
      <NavTitle>WIKINITY</NavTitle>
      <NavCategoryBox>
        <NavCategoryLink to="/">MAIN</NavCategoryLink>
        <NavCategoryLink to="/wiki">WIKI</NavCategoryLink>
        <NavCategoryLink to="/notice">NOTICE</NavCategoryLink>
        <NavCategoryLink to="/projectList">PROJECT</NavCategoryLink>
        <NavCategoryLink to="/#">JOURNAL</NavCategoryLink>
      </NavCategoryBox>
      <NavModalBox>
        <img src={Calendar} alt="calendar" />
        <img src={Todo} alt="todo" />
        <ProfileBtn onClick={() => setShowProfile(!showProfile)}>
          <img src={Profile} alt="profile" />
        </ProfileBtn>
      </NavModalBox>
      {/* Modals */}
      {showProfile ? <ProfileModal setShowProfile={setShowProfile} /> : null}
    </NavBar>
  );
}
