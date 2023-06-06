import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
import ProfileShowcase from "./ProfileShowcase";

function ProfileTab() {

    const {loggedInUserId} = useContext(LogInContext);
    const {getImage,giveMeProfileInfo,  showcaseOn, setShowcaseOn, realTimeProfiles} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);    
    const[loggedUserImage, setLoggedUserImage] = useState(null);
    
    const [profile, setProfile] = useState(null);

        const getProfile = async() => {
            if(loggedInUserId != null){
               let currUserProfile = realTimeProfiles.find((profile) => profile.userId === loggedInUserId);

            setProfile(currUserProfile); 
            getImage(loggedInUserId, setPostImage);
            }
            
        }

    useEffect(() => {

        
        getProfile();
        
    }, [realTimeProfiles])


    return (
        <>
    <div className="flex flex-col items-center w-full">
        {loggedInUserId != null && 
        
        <div className="h-auto w-full bg-slate-500 text-white text-base flex flex-col items-left mt-20 -mb-10 rounded-lg pl-20 pb-10">
                <span className="grid grid-cols-[2fr,12fr]">
                    <div className="-ml-16 mt-14"  style={{ height: '5vw', width: '5vw', borderRadius: '50%' }}>
                        <img style={{ height: '5vw', width: '5vw', borderRadius: '50%' }} src={postImage} alt="Image"/>
                    </div>
                    
                <span className="col-span-1 flex flex-col items-start ml-4 mt-2">
                    

                        {profile != null &&
                         <>
                         <span className="flex flex-row items-center bg-blue-300 mt-3">
                         <h1 className="font-bold mr-2 text-xl">{profile.userName}</h1>
                         <h1 className="mr-2">@{profile.tag}</h1>
                         
                         </span>
                         <span className="grid grid-cols-2 gap-4">
                            <h1>Following</h1>
                            <h1>Followers</h1>
                            <p className="pl-8 font-bold -mt-2">{profile.following.length}</p>
                            <p className="pl-8 font-bold -mt-2">{profile.followers.length}</p>

                         </span>
                         </>}

                    
                </span>
                {profile != null &&  <p className="mt-2 row-span-1 col-span-2 -ml-16">{profile.bio}</p>}
               
            </span>
                    </div>
            }
            {showcaseOn && <>
                    <ProfileShowcase />
            </>

            }

    </div>
        </>
    )

}

export default ProfileTab;