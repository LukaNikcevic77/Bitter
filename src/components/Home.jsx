import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {signOut } from "firebase/auth";
import {getDocs, collection, orderBy} from "firebase/firestore";
import { LogInContext } from "../contexts/LogInContext";
import { HomeContext } from "../contexts/HomeContext";
import ProfileTab from "./ProfileTab";
import Feed from "./Feed";
import ProfileShowcase from "./ProfileShowcase";

function Home() {
    
   
    const {getPosts, postsLoaded, showcaseOn} = useContext(HomeContext);

    const {typeOfLogin, setLoggedInUSerId} = useContext(LogInContext);
   
    
    
      useEffect(() => {

          getPosts();
          
          

      }, [])

     

    useEffect(() => {
        
    }, [])
    return (
        <>
        
        <div className="bg-black bg-opacity-90 text-base w-screen h-screen overflow-hidden -mb-20 pt-10 flex">
        <div className="w-1/4 pt-32 pl-16 pb-56 flex flex-col items-start text-4xl overflow-y-auto">
            <button 
        className="mt-10 px-10 py-5 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none"
       onClick={() => getPosts()} >Explore</button>
            <button className="mt-10 px-10 py-5 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none"
           onClick={async() => {await signOut(auth); setLoggedInUSerId(null)}} >Log out</button>
            {showcaseOn && <>
                    <ProfileShowcase />
            </>}
        </div>
        <div className="w-1/2 bg-blue-600 overflow-y-auto">{postsLoaded &&  <Feed/>}</div>
        <div className="w-1/4 bg-green-600 mt-10 overflow-y-auto"><ProfileTab /></div>
        </div>

        </>
    )
}

export default Home;