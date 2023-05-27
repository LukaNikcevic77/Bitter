import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";


function ProfileMaker(){

    let meta = auth?.currentUser?.metadata;

    return (
        <>
            <p>{auth?.currentUser?.providerId.toString()}</p>
            <p>{auth?.currentUser?.uid}</p>
        </>
    )


}

export default ProfileMaker;