import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Wiki from './pages/Wiki'
import Gallery from './pages/Gallery'
import styled from 'styled-components'

const Router = () => {
  return (
    <>
      <Container>
        <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/wiki/*" element={<Wiki />}> </Route>
          <Route path="/gallery" element={<Gallery />}> </Route>
        </Routes>
      </Container>
    </>
  )
}

const Container = styled.main`
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  top:60px;
`

export default Router