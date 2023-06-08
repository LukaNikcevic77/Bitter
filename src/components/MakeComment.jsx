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
            <div className="h-auto w-90 bg-slate-700 text-white text-base flex flex-col items-left mt-5  col-span-2 rounded-lg">
                <span className="grid grid-cols-[2fr,12fr]">
                    <img className="w-50 h-50 rounded-full ml-4 mt-4" src={postImage} alt="Image" />
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
                     className="rounded-xl bg-slate-900 text-white border-none focus:outline-none outline-none:disabled pt-5 pl-5 pr-2" 
                     style={{resize: "none"}}
                     onChange={(e) => setPostContent(e.target.value)}></textarea>
                    </span>
                    <button disabled={canComment}
                     className="rounded-3xl bg-gray-900 text-base text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none mt-4 px-10 py-5"
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
