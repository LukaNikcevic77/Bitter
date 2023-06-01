import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
function MakePost(){

    const {loggedInUserId} = useContext(LogInContext);


    const [profile, setProfile] = useState(null);
    const {giveMeProfileInfo, getImage, url} = useContext(HomeContext);
    const [postContent, setPostContent] = useState("");
            

            useEffect(() => {

                const getProfile = async() => {
                    if(loggedInUserId != null){
                       const retrievedData = await giveMeProfileInfo(loggedInUserId);

                    setProfile(retrievedData); 
                    getImage(loggedInUserId);
                    }
                    
                }
                getProfile();

                
            }, [])


    return (
        <>
            {loggedInUserId != null && 
            <>
                    <div className="h-auto w-2/3 bg-slate-500 text-white text-base flex flex-col items-left mt-20 -mb-10 rounded-lg">
                <span className="grid grid-cols-[2fr,12fr]">
                    <img className="w-50 h-50 rounded-full ml-4 mt-4" src={url} alt="Image" />
                <span className="col-span-1 flex flex-col items-start">
                    <span className="flex flex-row items-center bg-blue-300 mt-4">

                        {profile != null &&
                         <>
                         <h1 className="font-bold mr-2 text-xl">{profile.userName}</h1>
                         <h1 className="mr-2">@{profile.tag}</h1>
                         </>}

                    </span>

                    <span className="row-span-1 col-span-1">
                    <textarea name="" id="" cols="40" rows="5" placeholder="What's on your mind?"
                     className="rounded-xl bg-slate-700 text-white border-none focus:outline-none outline-none:disabled pt-5 pl-5 pr-2" 
                     style={{resize: "none"}}
                     onChange={(e) => setPostContent(e.target.value)}></textarea>
                    </span>
                    <button
                     className="rounded-3xl bg-gray-700 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-10 py-5"
                     >Throw it out!</button>
                 </span>
                </span>
                
                 
           
                
            </div>
            </> 
            }
        </>
    )


}

export default MakePost;
