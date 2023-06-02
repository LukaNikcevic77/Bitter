import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { db } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import {getDocs, collection, orderBy} from "firebase/firestore";
import { LogInContext } from "../contexts/LogInContext";
import { HomeContext } from "../contexts/HomeContext";
import Feed from "./Feed";

function Home() {
    
   
    const {getPosts, postsLoaded} = useContext(HomeContext);

    const {typeOfLogin} = useContext(LogInContext);
   
    
    
      useEffect(() => {

          getPosts();
          
          

      }, [])

     

    useEffect(() => {
        
    }, [])
    return (
        <>
        
        <div className="bg-black bg-opacity-90 text-base w-screen h-screen overflow-hidden -mb-10 pt-10 flex">
        <div className="w-1/4 pt-32 pl-16 flex flex-col items-start text-4xl">
            <button 
        className="mt-10 px-10 py-5 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none"
       onClick={() => getPosts()} >Explore</button>
            <button className="mt-10 px-10 py-5 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none"
            >Log out</button>
        </div>
        <div className="w-1/2 bg-blue-600 overflow-y-auto">{postsLoaded &&  <Feed/>}</div>
        <div className="w-1/4 bg-green-600">Third column</div>
        </div>

        </>
    )
}

export default Home;