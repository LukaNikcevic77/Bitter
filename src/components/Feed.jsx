import React from "react";  
import { useState, useEffect, useContext } from "react";
import {auth} from "../firebase/firebase";
import { LogInContext } from "../contexts/LogInContext";
import { HomeContext } from "../contexts/HomeContext";
import Post from "./Post";

function Feed(props){
    
    const {getImage, url} = useContext(HomeContext);
    
   
    useEffect(() => {
        
    }, [])
   const {array} = props;

    

    return (
        <>
            {array.map((post) => {
                
                getImage(post.CreatedBy);
                return <Post img={url} uid={post.CreatedBy} content = {post.Content} comments={post.Comments} likes={post.Likes} makingTime={post.CreatedTime} postId = {post.postId}/>}
                
            )}
        </>
    )


}

export default Feed;