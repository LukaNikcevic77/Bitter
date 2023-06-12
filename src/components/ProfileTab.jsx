import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
import PostsByCreator from "../components/PostsByCreator";
function ProfileTab() {

    const {loggedInUserId} = useContext(LogInContext);
    const {getImage, realTimeProfiles} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);    
    
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
        
    }, [realTimeProfiles, loggedInUserId])


    return (
        <>
        {loggedInUserId != null && 
        
        <div className="profileShowcase" style={{maxWidth: '90%', marginLeft: '1vw'}}>
                <span className="contentHolder">
                   
                        <img className="mediumImage" src={postImage} alt="Image"/>
                   
                    
                <span className="profileInfo">
                    

                        {profile != null &&
                         <>
                         <span className="naming" style={{marginLeft: '2.3vw'}}>
                         <h1 className="smallText bold">{profile.userName}</h1>
                         <h1 className="smallText" style={{marginLeft: '1vw'}}>@{profile.tag}</h1>
                         
                         </span>
                         <span className="followingContainer">
                            <h1 className="smallText normal">Following</h1>
                            <h1 className="smallText normal">Followers</h1>
                            <p className="bold smallText" style={{paddingLeft: '2vw', marginLeft: '-0.2', marginTop: '-1vw'}}>{profile.following.length}</p>
                            <p className="bold smallText" style={{paddingLeft: '2vw', marginLeft: '-0.2', marginTop: '-1vw'}}>{profile.followers.length}</p>

                         </span>
                         </>}

                    
                </span>
                {profile != null &&  <p className="bio mediumText" style={{marginLeft: '2vw'}}>{profile.bio}</p>}
               
            </span>
                    </div>
                   
            }
            

   
                {profile != null &&  <PostsByCreator targetedUser={loggedInUserId}/>}
        </>
    )

}

export default ProfileTab;