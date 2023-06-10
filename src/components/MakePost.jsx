import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
function MakePost(props){

    const {loggedInUserId, canPost} = useContext(LogInContext);


    const [profile, setProfile] = useState(null);
    const [userProfileImage, setUserImageProfileImage] = useState(null);
    const {giveMeProfileInfo, getImage, addPost, getPosts} = useContext(HomeContext);
    
    const [postContent, setPostContent] = useState("");
            

            useEffect(() => {

                const getProfile = async() => {
                    if(loggedInUserId != null){
                       const retrievedData = await giveMeProfileInfo(loggedInUserId);

                    setProfile(retrievedData); 
                    getImage(loggedInUserId, setUserImageProfileImage);
                    }
                    
                }
                getProfile();

                
            }, [])


    return (
        <>
            {loggedInUserId != null && 
            <>
                    <div className="makePost">
                <span className="postGrid">
                    <img className="bigImage" src={userProfileImage} alt="Image" />
                <span className="firstSpan">
                    <span className="namingSpan">

                        {profile != null &&
                         <>
                         <h1 className="mediumText">{profile.userName}</h1>
                         <h1 className="smallText">@{profile.tag}</h1>
                         </>}

                    </span>

                    <span className="inputContainer">
                    <textarea name="" id="" cols="40" rows="5" placeholder="What's on your mind?"
                     className="input-1 smallText" 
                     style={{resize: "none"}}
                     onChange={(e) => setPostContent(e.target.value)}
                     value={postContent}></textarea>
                    </span>
                    <button disabled={canPost}
                     className="btn-1 smallText"
                     onClick={() => { addPost(loggedInUserId, postContent, getPosts); setPostContent("")}}>Throw it out!</button>
                 </span>
                </span>
                
                 
           
                
            </div>
            </> 
            }
        </>
    )


}

export default MakePost;
