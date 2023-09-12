import Header from 'components/Header'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'
import AuthProvider from './authentication/authProvider'

const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header/>
        <Router />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App