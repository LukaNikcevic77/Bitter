import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";

function ProfileTab() {

    const {loggedInUserId} = useContext(LogInContext);
    const {getImage, url, giveMeProfileInfo} = useContext(HomeContext);
    const [profile, setProfile] = useState(null);

        const getProfile = async() => {
            if(loggedInUserId != null){
               const retrievedData = await giveMeProfileInfo(loggedInUserId);

            setProfile(retrievedData); 
            getImage(loggedInUserId);
            }
            
        }

    useEffect(() => {

        
        getProfile();

        
    }, [])


    return (
        <>
        {loggedInUserId != null && 
        
        <div className="h-auto w-full bg-slate-500 text-white text-base flex flex-col items-left mt-20 -mb-10 rounded-lg pl-20 pb-10">
                <span className="grid grid-cols-[2fr,12fr]">
                    <div className="-ml-16 mt-14"  style={{ height: '5vw', width: '5vw', borderRadius: '50%' }}>
                        <img style={{ height: '5vw', width: '5vw', borderRadius: '50%' }} src={url} alt="Image"/>
                    </div>
                    
                <span className="col-span-1 flex flex-col items-start ml-4 mt-2">
                    

                        {profile != null &&
                         <>
                         <span className="flex flex-row items-center bg-blue-300 mt-3">
                         <h1 className="font-bold mr-2 text-xl">{profile.userName}</h1>
                         <h1 className="mr-2">@{profile.tag}</h1>
                         
                         </span>
                         
                         </>}

                    
                </span>
                <p className="mt-2 row-span-1 col-span-2 -ml-16">{profile.bio}</p>
            </span>
                    </div>
            }
        
        </>
    )

}

export default ProfileTab;