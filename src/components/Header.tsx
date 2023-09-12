import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import './Header.css'
import { AuthContext } from 'authentication/authContext';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Header = () => {
  const pageLink = ["", "Wiki/", "Gallery"]
  const pageName = ["Home", "Wiki", "Gallery"]
  const user = useContext(AuthContext)


  return (
    <Container>
      <ul className="header__link_wrapper">
        {
          pageLink.map((link,idx)=>
            <li key={pageName[idx]} >
              <Link to={`/${link}`}> {pageName[idx]} </Link>
            </li>  
          )
        }
        <li>{(user?.displayName) ? <>{user.displayName}님 <button onClick={handlerLogout}>로그아웃</button></> : <Link to={`/login`}> 로그인 </Link>} </li>
      </ul>
    </Container>
  )
}

const handlerLogout = () => {
  signOut(auth);
}

const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: #999;
  font-size: 1rem;
  z-index: 10;
`

export default Header