import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Wiki from './pages/Wiki'
import Gallery from './pages/Gallery'

const Router = () => {
  return (
    <>
      <Routes>
          <Route path="/" element={<Home />}> </Route>
          <Route path="/wiki" element={<Wiki />}> </Route>
          <Route path="/gallery" element={<Gallery />}> </Route>
        </Routes>
    </>
  )
}

export default Router