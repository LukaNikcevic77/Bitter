import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
import PostsByCreator from "../components/PostsByCreator";
function ProfileShowcase(){


    const {loggedInUserId} = useContext(LogInContext);
    
    const {getImage, profileToShowCase, follow, profileToShowCaseObject, realTimeProfiles} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);  
    const [profile, setProfile] = useState(null);
    const [currUser, setCurrUser] = useState(null);
    const [amFollowing, setAmFollowing] = useState(false);

    const getProfile = async() => {

        if(profileToShowCase != null){
        
        let currUSer = realTimeProfiles.find((profile) => profile.userId === loggedInUserId);
        let showcaseingUser = realTimeProfiles.find((profile) => profile.userId === profileToShowCase);

        setCurrUser(currUSer);
        setProfile(showcaseingUser); 
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
          else {
            setAmFollowing(false);
          }
        }
      }, [profile, profileToShowCase, loggedInUserId, realTimeProfiles]);
    
    
    return (<>
    {profileToShowCase != loggedInUserId && profileToShowCase != null && 
    <>
        <div className="profileShowcase">
                <span className="contentHolder">
                    
                        <img className="mediumImage" src={postImage} alt="Image"/>
                    
                    
                <span className="profileInfo">
                    

                        {profile != null &&
                         <>
                         <span className="naming">
                         <h1 className="smallText bold">{profile.userName}</h1>
                         <p className="smallText" style={{marginLeft: '1vw'}}>@{profile.tag}</p>
                         
                         </span>
                         <span className="followingContainer">
                            <h1 className="smallText normal">Following</h1>
                            <h1 className="smallText normal">Followers</h1>
                            <p className="bold smallText" style={{paddingLeft: '2vw', marginLeft: '-0.2', marginTop: '-1vw'}}>{profile.following.length}</p>
                            <p className="bold smallText" style={{paddingLeft: '2vw', marginLeft: '-0.2', marginTop: '-1vw'}}>{profile.followers.length}</p>

                         </span>
                         </>}

                    
                </span>
                {profile != null &&  <p className="bio mediumText">{profile.bio}</p>}
            </span>

            {!amFollowing && <>
                <button className="btn-1 mediumText"
               onClick={() => {follow(profile, currUser, "follow"); setProfile(profileToShowCaseObject)}}>Follow</button>
            </>}
            {amFollowing && <>
                <button className="btn-2 mediumText"
               onClick={() => {
                follow(profile, currUser, "unfollow");  setProfile(profileToShowCaseObject);
                }}>Unfollow</button>
            </>}
               
                    </div>
                    <div style={{marginLeft: '-2vw'}}>
               {profile != null && <PostsByCreator targetedUser={profile.userId}/> } 
               </div>
                    </>
    }
   </> )
}

export default ProfileShowcase