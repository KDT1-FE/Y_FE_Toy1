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
import ProfileModal from "../pages/MainPage/ProfileModal";
import { ProfileBtn } from "../styled/MainPage/ProfileModal";
import CommuteModal from "../pages/MainPage/CommuteModal";
import TodoModal from "../pages/MainPage/TodoModal";

export default function Navigation() {
  const [showProfile, setShowProfile] = useState(false);
  const [showCommute, setShowCommute ] = useState(false);
  const [showTodo, setShowTodo ] = useState(false);


  const location = useLocation()
  const currentCategory = location.pathname.split("/")[1]

  const categories = [['MAIN', ''], ['WIKI', 'wiki'], ['NOTICE', 'notice'], ['PROJECT', 'projectlist'], ['journal', 'journal']]
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
        <ProfileBtn onClick={()=>setShowCommute(!showCommute) }>
          <img src={Calendar} alt="commute" />
        </ProfileBtn>

        <ProfileBtn onClick={()=>setShowTodo(!showTodo) }>
        <img src={Todo} alt="todo" />
        </ProfileBtn>

        <ProfileBtn onClick={() => setShowProfile(!showProfile)}>
          <img src={Profile} alt="profile" />
        </ProfileBtn>
      </NavModalBox>
      {/* Modals */}
      {showProfile ? <ProfileModal setShowProfile={setShowProfile} /> : null}
      {showCommute ? <CommuteModal setShowCommute = {setShowCommute} /> : null}
      {showTodo ? <TodoModal setShowTodo = {setShowTodo} /> : null}

    </NavBar>
  );
}
