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
        
            
                
                <div className="h-auto w-2/3 bg-slate-500 text-white text-base flex flex-col items-left mt-20 -mb-12 rounded-lg">
                <span className="grid grid-cols-[2fr,12fr]">
                    <img className="w-50 h-50 rounded-full ml-4 mt-4" src={props.img} alt="Image" />
                <span className="col-span-1 flex flex-col items-start">
                    <span className="flex flex-row items-center bg-blue-300 mt-4">

                        {profile != null &&
                         <>
                         <h1 className="font-bold mr-2 text-xl">{profile.userName}</h1>
                         <h1 className="mr-2">@{profile.tag}</h1>
                         <h1 className="mr-2 mb-1">|</h1>
                         <p className="text-lg mr-2">{month} {day}</p>
                         <p>{postHours} : {postMinutes}</p>
                         </>}

                    </span>

                    <span className="row-span-1 col-span-1">
                    <h1>This is my content: {props.content}</h1>
                    </span>
                 </span>
                </span>
                
                    
               
                
                
                <span className="grid grid-cols-2 gap-4">

                <Like likes={props.likes} postId={props.postId} className="col-span-2" />
                <Comment comments={props.comments} className="col-span-2" />
                </span>
                
                
            
           
                
            </div>

        
            
        </>
    )

}

export default Post;