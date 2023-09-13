import React, { useEffect, useState, useContext } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { AuthContext } from 'authentication/authContext';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase'

const Header = () => {
  const pageLink = ["", "Wiki", "Gallery"]
  const pageName = ["Home", "Wiki", "Gallery"]
  const user = useContext(AuthContext)
  const [pathLink, setPathLink ] = useState("")
  const location = useLocation()

  useEffect(()=>{
    setPathLink(location.pathname.split("/")[1])
  },[location])

  return (
    <Container>
      <InnerContainer>
        <ul className="header__link-wrapper">
          {
            pageLink.map((link,idx)=>{              
              let name = ""
              if(pathLink === pageLink[idx]) name += "active" 
              return(
                <li key={pageName[idx]} >
                  <Link to={`/${link}`}><h1 className={name}> {pageName[idx]} </h1>  </Link>
                </li>  
              )
            }
              
            )
          }
          <li> <StyledButton> <p> 학습 시간</p> </StyledButton></li>
          <li>{(user?.displayName) 
            ? <>{sliceStr(user.displayName, 10)}님 <button onClick={handlerLogout}><h2>로그아웃</h2></button></> 
            : <Link to={`/login`}><h2>로그인</h2> </Link>} </li>
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

const StyledButton = styled.button`
  color: var(--main-color);
  border: 0.8px solid var(--main-color);
  border-radius: 5px;
  width: 100px;
  height: 35px;
  background-color: #ffff;
  cursor: pointer;
  p{
    margin: 0 auto;
  }
`

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
  h1{
    font-size: 1.2rem;
  }
  h2{
    font-size: 0.9rem;
  }
  .active{
    color: var(--main-color);
  }
  .header__link-wrapper{
    display:flex;
    justify-content: flex-end;
    margin-right: 3rem;
    gap: 20px; 
    align-items: center;
  }
`

export default Header