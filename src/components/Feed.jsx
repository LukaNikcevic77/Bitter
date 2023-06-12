import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import Post from "./Post";
import MakePost from "./MakePost";

function Feed(props){
    
    const {postList, profileList, setProfileToShowCast, setShowcaseOn} = useContext(HomeContext);

    const [searchValue, setSearchValue] = useState("");
    useEffect(() => {
        
    }, []) 


    

    return (
        <>
        <input
           type="text"
            className="searchBar smallText"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => {setSearchValue(e.target.value)}}
        />
        {profileList != null && <div>
            {profileList
                .filter((profile) => {
                    const searchProfile = searchValue.toLowerCase();
                    const usertag = profile.tag.toLowerCase();
                    if(searchProfile != "" && usertag.startsWith(searchProfile)){
                        return profile;
                    }
                })
                .map((correctProfile) => {

                    return <div className="searchBarField smallText"
                    onClick={() => {setProfileToShowCast(correctProfile.userId); setSearchValue(""); setShowcaseOn(true)}}
                    >
                        @ {correctProfile.tag}
                    </div>
                })
            
            }
        </div>}
        <MakePost/>
            {postList.map((post) => {
                
                
                return <Post uid={post.CreatedBy} content = {post.Content} comments={post.Comments} likes={post.Likes} makingTime={post.CreatedTime} postId = {post.postId} key={post.postId}/>}
                
            )}
        </>
    )


}

export default Feed;