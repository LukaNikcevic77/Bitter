import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
function ProfileShowcase(){


    const {loggedInUserId} = useContext(LogInContext);
    
    const {getImage,giveMeProfileInfo, profileToShowCase, follow} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);  
    const [profile, setProfile] = useState(null);
    const [postImg, setPostImg] = useState(null);
    const [amFollowing, setAmFollowing] = useState(false);

    const getProfile = async() => {
        if(profileToShowCase != null){
           const retrievedData = await giveMeProfileInfo(profileToShowCase);

        setProfile(retrievedData); 
        getImage(profileToShowCase, setPostImage);
        
        
        }
        
    }

    useEffect(() => {
        getProfile();
      
        if (profile !== null && profile.followers) {
          const set = new Set(profile.followers);
          const doesFollow = set.has(loggedInUserId);
          if (doesFollow === true) {
            setAmFollowing(true);
          }
        }
      }, [profile, profileToShowCase, loggedInUserId]);
    
    
    return (<>
    {profileToShowCase != loggedInUserId && profileToShowCase != null && 
    <>
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

            {!amFollowing && <>
                <button className="w-full -ml-5 py-5 rounded-full bg-blue-500 hover:bg-blue-300"
               onClick={() => {follow(profileToShowCase, loggedInUserId, "follow"); getProfile();}}>Follow</button>
            </>}
            {amFollowing && <>
                <button className="w-full -ml-5 py-5 rounded-full bg-blue-300 hover:bg-blue-500"
               onClick={() => {
                follow(profileToShowCase, loggedInUserId, "unfollow"); getProfile();
                }}>Unfollow</button>
            </>}
               
                    </div>
                    </>
    }
   </> )
}

export default ProfileShowcase