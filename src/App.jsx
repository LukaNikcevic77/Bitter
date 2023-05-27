import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import Home from './components/Home'
import { LogInContextProvider } from './contexts/LogInContext'

function App() {  
 
  return (
    <>
    <LogInContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<WelcomeScreen/>}></Route>
          <Route path='/Home' element={<Home />}></Route>
        </Routes>
      </BrowserRouter>
      </LogInContextProvider>
    </>
  )
  
}

export default App
