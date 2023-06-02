import React from 'react'
import { useState, useContext, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import Home from './components/Home'
import { LogInContextProvider } from './contexts/LogInContext'
import { HomeContextProvider } from './contexts/HomeContext'
import ProfileMaker from './components/ProfileMaker'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCertificate } from "@fortawesome/free-solid-svg-icons";

function App() {  
 
  return (
    <>
    
    <LogInContextProvider>
    <HomeContextProvider>
      <BrowserRouter>
      <div className="bg-black text-2xl w-screen h-20 overflow-hidden fixed">
                <div className="bg-black">
                  <p className="text-white flex flex-row items-start pt-6 pl-10">
                    <FontAwesomeIcon
                      icon={faCertificate}
                      className="text-yellow-300 mr-2 text-2xl pt-1"
                    />
                    Clout
                  </p>
                </div>
              </div>
        <Routes>
          <Route path='/' element={<WelcomeScreen/>}></Route>
          <Route path='/Home' element={<Home />}></Route>
          <Route path='/ProfileMaker' element={<ProfileMaker/>}></Route>
        </Routes>
      </BrowserRouter>
      </HomeContextProvider>
      </LogInContextProvider>
      
    </>
  )
  
}

export default App
