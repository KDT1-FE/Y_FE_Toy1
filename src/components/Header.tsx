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
      <InnerContainer>
        <ul className="header__link-wrapper">
          {
            pageLink.map((link,idx)=>
              <li key={pageName[idx]} >
                <Link to={`/${link}`}> {pageName[idx]} </Link>
              </li>  
            )
          }
        <li>{(user?.displayName) ? <>{sliceStr(user.displayName, 10)}님 <button onClick={handlerLogout}>로그아웃</button></> : <Link to={`/login`}> 로그인 </Link>} </li>
        </ul>
      </InnerContainer>
    </Container>
  )
}

const sliceStr = (str:string, n:number) => {
  return str.length>=n ? str.slice(0,n+1)+ "..." : str
}

const handlerLogout = () => {
  signOut(auth);
}
const InnerContainer = styled.div`
  margin: 0 auto;
  max-width: 1200px;

`

const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  border-bottom: 2px solid #ddd;
  font-size: 1rem;
  z-index: 10;
  background-color: #fff;
`

export default Header