import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import Post from "./Post";

function PostsByCreator(props){
    
    const {getImage, url, postList} = useContext(HomeContext);
    const [postImage, setPostImage] = useState(null);  
    const {targetedUser}  = props;
    useEffect(() => {
        
    }, []) 


    

    return (
        <>
            {postList
            .filter((post) => 
                {
                    return post.CreatedBy === targetedUser;
                }
            )
            .slice(0, 5)
            
            .map((post) => {
                
                
                return <Post size={"small"} uid={post.CreatedBy} content = {post.Content} comments={post.Comments} likes={post.Likes} makingTime={post.CreatedTime} postId = {post.postId} key={post.postId}/>}
                
            )}
        </>
    )


}

export default PostsByCreator;