import './style/style.scss'
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WelcomeScreen from './components/WelcomeScreen'
import Home from './components/Home'
import { LogInContextProvider } from './contexts/LogInContext'
import { HomeContextProvider } from './contexts/HomeContext'
import ProfileMaker from './components/ProfileMaker'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLemon } from "@fortawesome/free-solid-svg-icons";
function App() {  
 
  return (
    <>
    
    <LogInContextProvider>
    <HomeContextProvider>
      <BrowserRouter>
      <div className="navbar mediumText">
                <div className="">
                  <p className="">
                    <FontAwesomeIcon
                      icon={faLemon}
                      className="logo mediumText"
                    />
                   
                  </p>
                  <p className='largeText'>Bitter </p> 
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
