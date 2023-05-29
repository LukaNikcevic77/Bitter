import React from "react";  
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import {auth} from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { LogInContext } from "../contexts/LogInContext";
function Home() {
    
    const {typeOfLogin} = useContext(LogInContext);
    const [url, setUrl] = useState(null);

    
     

    useEffect(() => {
        if(typeOfLogin != "guest"){

            const profileImage = ref(storage, `profileImages/${auth.currentUser.uid}`);
            getDownloadURL(profileImage).then((url) => {setUrl(url)});
        }
    }, [])
    return (
        <>
        {typeOfLogin != "guest" && (<div>
                <h1 className="text-8xl text-black">Hell yeah!</h1>
                <p>{auth?.currentUser?.email}</p>
                <img src={url} alt="" />
            </div>)}
        {typeOfLogin == "guest" && (
            <h1>Guest is here bro!</h1>
        )}
            
        </>
    )
}

export default Home;