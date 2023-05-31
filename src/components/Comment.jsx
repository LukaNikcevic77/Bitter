import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";

function Comment(props) {

    const {giveMeProfileInfo, getImage, url} = useContext(HomeContext);
    
    const [profile, setProfile] = useState(null);
    const [commentAmmount, setCommentAmmount] = useState([]);
    const [seeComments, setSeecomments] = useState(null);

   
        
    const parseObjects = (comments) => {
        const parsedArray = comments.map((comment) => {
          const trimmedString = comment.slice(1, -1);
          const pairs = trimmedString.split(",");
      
          const parsedComment = {};
          pairs.forEach((pair) => {
            const [key, value] = pair.split(":");
            const trimmedKey = key.trim();
            const trimmedValue = value.trim();
            parsedComment[trimmedKey] = trimmedValue;
          });
      
          return parsedComment;
        });
      
        return parsedArray;
      };
          
   
    const commentSwitch = (a) => {
        if(a == false){
            setSeecomments(true);
        }
        else if(a == true){
            setSeecomments(false);
        }
    }
    const getProfile = async(a) => {
        const retrievedData = await giveMeProfileInfo(a);

        setProfile(retrievedData);
    }
    useEffect(() => {
        
        
        
        setSeecomments(false);
        const parsedComments = parseObjects(props.comments);
       
        
        setCommentAmmount(parsedComments);
    }, [props.comments])
    
        return (
            <>
            
                <h1>{commentAmmount.length}</h1>
                <button className="px-5 py-2 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none" onClick={() => commentSwitch(seeComments)}>See comments</button>
                {seeComments && commentAmmount.map((comment) => {
                getImage(comment.uid)
                getProfile(comment.uid);
                return <>
                    <div className="h-auto w-2/3 bg-slate-500 text-white text-base flex flex-col items-left mt-20">
                <span className="flex flex-row items-start">
                    <img src={url} alt="Image" />
                <h1>This is my uid: {comment.uid}</h1>

                </span>
                <span className="flex flex-col items-center">
                    {profile != null && <><h1>{profile.userName}</h1>
                    <h1>{profile.tag}</h1></>}
                </span>
                   
                <h1>This is my content: {comment.content}</h1>
                
            
           
                
            </div>
                </> })}
           
            </>
        )
        
    }

export default Comment;