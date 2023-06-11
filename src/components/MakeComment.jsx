import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";


function MakeComment(props){

    const {loggedInUserId} = useContext(LogInContext);
    const {postId} = props;

    const [profile, setProfile] = useState(null);
    const {addComment, giveMeProfileInfo, getImage, canComment} = useContext(HomeContext);
    const [postContent, setPostContent] = useState("");
    const [postImage, setPostImage] = useState(null);    
    

    const makeObjectForArray = () => {

        const obj = `{uid: ${loggedInUserId}, content: "${postContent}", likes: 0}`;
            
        
        
        addComment(postId, obj);
    }

            useEffect(() => {

                const getProfile = async() => {
                    if(loggedInUserId != null){
                       const retrievedData = await giveMeProfileInfo(loggedInUserId);

                    setProfile(retrievedData); 
                    getImage(loggedInUserId, setPostImage);

                    }
                    
                }
                getProfile();

                
            }, [])


    return (
        <>
            {loggedInUserId != null && 
            <>
            <div className="makeComment">
                <span className="contentHolder">
                    <img className="mediumImage" src={postImage} alt="Image" />
                <span className="profileInfo">
                    <span className="nameAndTag">

                        {profile != null &&
                         <>
                         <h1 className="mediumText bold">{profile.userName}</h1>
                         <h1 className="mediumText normal" style={{marginLeft: '10%'}}>@{profile.tag}</h1>
                         </>}

                    </span>

                    <span className="typingArea">
                    <textarea name="" id="" cols="40" rows="5" placeholder="What's on your mind?"
                     className="typer smallText" 
                     style={{resize: "none"}}
                     onChange={(e) => setPostContent(e.target.value)}></textarea>
                    </span>
                    <button disabled={canComment}
                     className="btn-1 mediumText"
                     onClick={() => makeObjectForArray()}>Let em know!</button>
                 </span>
                </span>
                
                 
           
                
            </div>
            
                    
            </> 
            }
        </>
    )


}

export default MakeComment;
