import Sidebar from 'components/Sidebar'
import React from 'react'
import styled from 'styled-components'
import { Route, Routes } from 'react-router-dom'
import Administration from '../components/Admin'
import Curriculum from '../components/Curriculum'

const Wiki = () => {
  
  return (
    <>
      <Sidebar />
      <Container>
        <Routes>
          <Route path="" element={<Administration />}></Route>
          <Route path="교육과정" element={<Curriculum />}></Route>
        </Routes>
      </Container>
    </>
  )
}

const Container = styled.section`
  position: relative;
  left: 180px;
  height: calc(100% - 60px);
  width: calc(100% - 180px);
  padding: 5px;
  box-sizing: border-box;
`

export default Wiki