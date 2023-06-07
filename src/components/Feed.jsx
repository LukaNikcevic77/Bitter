import React from "react";  
import { useState, useEffect, useContext } from "react";
import {auth} from "../firebase/firebase";
import { HomeContext } from "../contexts/HomeContext";
import Post from "./Post";
import MakePost from "./MakePost";

function Feed(props){
    
    const {getImage, url, postList, profileList, setProfileToShowCast, setShowcaseOn} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);    

    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        
    }, []) 


    

    return (
        <>
        <input
           type="text"
            className="w-2/3 bg-black text-white text-base mt-20 py-5 px-10 rounded-3xl"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value)}}
        />
        {profileList != null && <div>
            {profileList
                .filter((profile) => {
                    const searchProfile = searchValue.toLowerCase();
                    const usertag = profile.tag.toLowerCase();
                    console.log(usertag.startsWith(searchProfile));
                    if(searchProfile != "" && usertag.startsWith(searchProfile)){
                        return profile;
                    }
                })
                .map((correctProfile) => {

                    return <div className="h-2/3 w-2/3 bg-slate-500 text-white text-base flex flex-col items-left mt-20 -mb-12 rounded-lg hover:cursor-pointer"
                    onClick={() => {setProfileToShowCast(correctProfile.userId); setSearchValue(""); setShowcaseOn(true)}}
                    >
                        @ {correctProfile.tag}
                    </div>
                })
            
            }
        </div>}
        <MakePost/>
            {postList.map((post) => {
                
                
                return <Post size={"big"} uid={post.CreatedBy} content = {post.Content} comments={post.Comments} likes={post.Likes} makingTime={post.CreatedTime} postId = {post.postId} key={post.postId}/>}
                
            )}
        </>
    )


}

export default Feed;