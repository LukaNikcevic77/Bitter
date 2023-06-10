import React from "react";  
import { useEffect, useContext } from "react";
import {auth} from "../firebase/firebase";
import {signOut } from "firebase/auth";
import { LogInContext } from "../contexts/LogInContext";
import { HomeContext } from "../contexts/HomeContext";
import ProfileTab from "./ProfileTab";
import Feed from "./Feed";
import ProfileShowcase from "./ProfileShowcase";

function Home() {
    
   
    const {getPosts, postsLoaded, showcaseOn} = useContext(HomeContext);

    const {setLoggedInUSerId} = useContext(LogInContext);
   
    
    
      useEffect(() => {

          getPosts();
          
          

      }, [])

     

    useEffect(() => {
        
    }, [])
    return (
        <>
        
        <div className="home mediumText">
        <div className="firstThird">
            <button 
        className="btn-1 mediumText"
       onClick={() => getPosts()} >Explore</button>
            <button className="btn-1 mediumText"
           onClick={async() => {await signOut(auth); setLoggedInUSerId(null)}} >Log out</button>
            {showcaseOn && <>
                    <ProfileShowcase />
            </>}
        </div>
        <div className="secondThird">{postsLoaded &&  <Feed/>}</div>
        <div className="lastThird"><ProfileTab /></div>
        </div>

        </>
    )
}

export default Home;