import React from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const page = ["", "Wiki", "Gallery"]
  // const location = useLocation()

  return (
    <Container>
      <ul>
        {
          page.map((page)=>{
            return (
              <li key={`page${page}`}  >
                <Link to={`/${page}`}> {`Page ${page}`} </Link>
              </li>
            )
          })
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
  height 80px;
  background-color: #fff;
`

export default Header