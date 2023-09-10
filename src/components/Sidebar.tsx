import React from 'react'
import styled from 'styled-components'

const Sidebar = () => {
  return (
    <Container>
      Sidebar
    </Container>
  )
}

const Container = styled.aside`
  position: fixed;
  left: 0;
  top: 60px;
  bottom: 0;
  z-index: 9;
  width: 140px;
  height: 100%;
  background-color: #888;
`

export default Sidebar