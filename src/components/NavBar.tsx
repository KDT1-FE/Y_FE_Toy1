import React, { useState } from "react";

import { useLocation } from "react-router-dom";
import {
  NavBar,
  NavCategoryBox,
  NavCategoryCurrentLink,
  NavCategoryLink,
  NavModalBox,
  NavTitle,
} from "../styled/Common/NavBar";
import Calendar from "../assets/img/Calendar.svg";
import Todo from "../assets/img/Todo.svg";
import Profile from "../assets/img/Profile.svg";
import ProfileModal from "../pages/MainPage/modal/ProfileModal";
import { ProfileBtn } from "../styled/MainPage/ProfileModal";
import CommuteModal from "../pages/MainPage/modal/CommuteModal";
import TodoModal from "../pages/MainPage/modal/TodoModal";

export default function Navigation() {
  const location = useLocation()
  const currentCategory = location.pathname.split("/")[1]

  const [activeModalIdx, setActiveModalIdx] = useState(-1)

  const categories = [['MAIN', ''], ['WIKI', 'wiki'], ['NOTICE', 'notice'], ['PROJECT', 'projectlist']]
  const NavCategories = categories.map((arr) => {
    if (arr[1] === currentCategory) {
      return <NavCategoryCurrentLink key={arr[0]} to={arr[1]}>{arr[0]}</NavCategoryCurrentLink>
    }
    return <NavCategoryLink key={arr[0]} to={arr[1]}>{arr[0]}</NavCategoryLink>
  })

  return (
    <NavBar>
      <NavTitle>WIKINITY</NavTitle>
      <NavCategoryBox>
        {NavCategories}
      </NavCategoryBox>
      <NavModalBox>
        <ProfileBtn onClick={() => {
          if (activeModalIdx === 1) {
            setActiveModalIdx(-1)
          } else {
            setActiveModalIdx(1)
          }
        }}>
          <img src={Calendar} alt="commute" />
        </ProfileBtn>

        <ProfileBtn onClick={() => {
          if (activeModalIdx === 2) {
            setActiveModalIdx(-1)
          } else {
            setActiveModalIdx(2)
          }
        }}>
          <img src={Todo} alt="todo" />
        </ProfileBtn>

        <ProfileBtn onClick={() => {
          if (activeModalIdx === 0) {
            setActiveModalIdx(-1)
          } else {
            setActiveModalIdx(0)
          }
        }}>
          <img src={Profile} alt="profile" />
        </ProfileBtn>
      </NavModalBox>
      {/* Modals */}
      {activeModalIdx === 0 ? <ProfileModal setActiveModalIdx={setActiveModalIdx} /> : null}
      {activeModalIdx === 1 ? <CommuteModal setActiveModalIdx={setActiveModalIdx} /> : null}
      {activeModalIdx === 2 ? <TodoModal setActiveModalIdx={setActiveModalIdx} /> : null}

    </NavBar>
  );
}
