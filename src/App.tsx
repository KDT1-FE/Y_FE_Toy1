import Header from 'components/Header'
import React, { useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'
import Router from 'Router'
import AuthProvider from './authentication/authProvider'
import { AuthContext } from 'authentication/authContext'

const App = () => {
  const userinfo = useContext(AuthContext)
  console.log(userinfo)
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