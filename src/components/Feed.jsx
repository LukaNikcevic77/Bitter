import React from "react";  
import { useState, useEffect, useContext } from "react";
import {auth} from "../firebase/firebase";
import { storage } from "../firebase/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { LogInContext } from "../contexts/LogInContext";
import Post from "./Post";

function Feed(props){
    const [url, setUrl] = useState(null);
    useEffect(() => {
        
    }, [])
   const {array} = props;

    const getImage = async(a) => {
        const profileImage = ref(storage, `profileImages/${a}`)
        getDownloadURL(profileImage).then((url) => {setUrl(url)})
    }

    return (
        <>
            {array.map((post) => {
                getImage(post.CreatedBy);
                return <Post img={url} uid={post.CreatedBy} content = {post.Content} comments={post.Comments} likes={post.Likes}/>
                }
            )}
        </>
    )


}

export default Feed;