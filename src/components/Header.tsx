import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const pageLink = ["", "Wiki", "Gallery"]
  const pageName = ["Home", "Wiki", "Gallery"]

  // const location = useLocation()

  return (
    <Container>
      <ul>
        {
          pageLink.map((link,idx)=>
              <li key={pageName[idx]} >
                <Link to={`/${link}`}> {pageName[idx]} </Link>
              </li>  
          )
        }
      </ul>
    </Container>
  )
}

const Container = styled.nav`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  width: 100%;
  height: 60px;
  background-color: #666;
  font-size: 1rem;
  z-index: 10;
`

export default Header