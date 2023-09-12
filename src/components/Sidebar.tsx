import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import "./Sidebar.css"

const Sidebar = () => {
  const location = useLocation()
  const hashSplit = location.pathname.split('/')

  if(hashSplit[1] === 'Wiki'){
    const sideLink = ["", "교육과정"]
    const sideName = ["행정", "교육과정"]
    
    // Wiki 사이드바 
    return (
      <Container>
        <ul className="sidebar__link-wrapper">
          {
            sideLink.map((link,idx)=>
              <li key={sideName[idx]} >
                <Link to={`/Wiki/${link}`}> {sideName[idx]} </Link>
              </li>  
            )
          }
        </ul>
      </Container>
    )

    // Gallery 사이드바
  }else if(hashSplit[1] === "Gallery"){
    return (
      <Container>
        Gallery Sidebar
      </Container>
    )
  }
  
}

const Container = styled.aside`
  position: fixed;
  z-index: 9;
  width: 180px;
  height: 100vh;
  border-right: 2px solid #ddd;
  box-sizing: border-box;
  padding: 5px;

`


export default Sidebar