import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import './Header.css'

const Header = () => {
  const pageLink = ["", "Wiki/", "Gallery"]
  const pageName = ["Home", "Wiki", "Gallery"]

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
        </ul>
      </InnerContainer>
    </Container>
  )
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