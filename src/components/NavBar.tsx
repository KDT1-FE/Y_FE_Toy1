import React from 'react'

import { Link } from 'react-router-dom'
import NavBar from '../styled/Common/NavBar'

export default function Navigation() {
  return (
    <NavBar>
      <div>WIKINITY</div>
      <div>
        <Link to="/#">MAIN</Link>
        <Link to="/#">WIKI</Link>
        <Link to="/#">NOTICE</Link>
        <Link to="/#">PROJECT</Link>
        <Link to="/#">JOURNAL</Link>
      </div>
      <div>
        <img src="" alt="" />
        <img src="" alt="" />
        <img src="" alt="" />
      </div>
    </NavBar>
  )
}
