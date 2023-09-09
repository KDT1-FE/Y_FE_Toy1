import Header from 'components/Header'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'

const App = () => {
  return (
    <>      
    <BrowserRouter>
      <Header/>
      <Router />
    </BrowserRouter>
    </>
  )
}

export default App