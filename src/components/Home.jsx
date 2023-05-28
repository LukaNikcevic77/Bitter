import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";

function Home() {
    
    const [url, setUrl] = useState(null);

    const profileImage = ref(storage, `profileImages/${auth.currentUser.uid}`);
    const imageLink = async() => {
        const setUrl = await profileImage.getDownloadURL();

    } 

    useEffect(() => {
        getDownloadURL(profileImage).then((url) => {setUrl(url)});
    }, [])
    return (
        <>
            <div>
                <h1 className="text-8xl text-black">Hell yeah!</h1>
                <p>{auth?.currentUser?.email}</p>
                <img src={url} alt="" />
            </div>
        </>
    )
}

export default Home;