import React from "react";  
import { useState, useEffect, useContext } from "react";
import { db } from "../firebase/firebase";
import { ref} from "firebase/storage";
import {getDocs, collection} from "firebase/firestore";
import  {HomeContext} from "../contexts/HomeContext";
import Comment from "./Comment";
import Like from "./Like";
function Post(props) {
   
                const [profile, setProfile] = useState(null);

                const {giveMeProfileInfo} = useContext(HomeContext);
            
            const timestampTranslated = props.makingTime.toDate();

            const monthNames = [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'July', 'August', 'September', 'October', 'November', 'December'
            ];

            const postHours = timestampTranslated.getHours().toString().padStart(2, "0");
            const postMinutes = timestampTranslated.getMinutes().toString().padStart(2, "0");

            const month = monthNames[timestampTranslated.getMonth()];
            const day = timestampTranslated.getDate().toString().padStart(2, "0");

            useEffect(() => {

                const getProfile = async() => {
                    const retrievedData = await giveMeProfileInfo(props.uid);

                    setProfile(retrievedData);
                }
                getProfile();

                
            }, [])
           
    return (

        
        <>
        
            
                
                <div className="h-auto w-2/3 bg-slate-500 text-white text-base flex flex-col items-left mt-20">
                <span className="flex flex-row items-start">
                    <img src={props.img} alt="Image" />
                <h1>This is my uid: {props.postId}</h1>

                </span>
                <span className="flex flex-col items-center">
                    {profile != null && <><h1>{profile.userName}</h1>
                    <h1>{profile.tag}</h1></>}
                </span>
                    
               
                <h1>This is my creation time:{postHours} : {postMinutes}</h1>
                <p>THis is my creation date: {month} {day}</p>
                <h1>This is my content: {props.content}</h1>
                <span className="flex flex-row items-center gap-4">
                <h1>This is my comments {props.comments.length}</h1>
                <Like likes={props.likes} postId={props.postId}/>
                <h1>This is my likes: {props.likes}</h1>
                </span>
                <Comment comments={props.comments} />
                
            
           
                
            </div>

        
            
        </>
    )

}

export default Post;