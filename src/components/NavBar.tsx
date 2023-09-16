import React from 'react'

import { NavBar, NavCategoryBox, NavCategoryLink, NavModalBox, NavTitle } from '../styled/Common/NavBar'
import Calendar from "../assets/img/Calendar.svg"
import Todo from "../assets/img/Todo.svg"
import Profile from "../assets/img/Profile.svg"

export default function Navigation() {
  return (
    <NavBar>
      <NavTitle>WIKINITY</NavTitle>
      <NavCategoryBox>
        <NavCategoryLink to="/">MAIN</NavCategoryLink>
        <NavCategoryLink to="/wiki">WIKI</NavCategoryLink>
        <NavCategoryLink to="/notice">NOTICE</NavCategoryLink>
        <NavCategoryLink to="/project">PROJECT</NavCategoryLink>
        <NavCategoryLink to="/#">JOURNAL</NavCategoryLink>
      </NavCategoryBox>
      <NavModalBox>
        <img src={Calendar} alt="calendar" />
        <img src={Todo} alt="todo" />
        <img src={Profile} alt="profile" />
      </NavModalBox>
    </NavBar>
  )
}
