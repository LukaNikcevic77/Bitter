import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";

function Home() {
    
    return (
        <>
            <div>
                <h1 className="text-8xl text-black">Hell yeah!</h1>
                <p>{auth?.currentUser?.email}</p>
            </div>
        </>
    )
}

export default Home;