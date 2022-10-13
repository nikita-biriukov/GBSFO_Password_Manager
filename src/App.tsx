import './App.scss'
import React from 'react'
import './utils/styles/reset.scss'
// import { Login } from './components/Login/Login'
import { Register } from './components/Register/Register'
import { NavBar } from './components/NavBar/NavBar'

export const App: React.FC = () => {
  return (
    <>
      <NavBar />
      {/* <Login /> */}
      <Register />
    </>
  )
}
