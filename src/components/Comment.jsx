import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import MakeComment from "./MakeComment";
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
                <span className="flex flex-row ">
                <h1 className="mr-2 mt-0.5">{commentAmmount.length}</h1>
                <button className="text-2xl hover:text-blue-900" onClick={() => commentSwitch(seeComments)}><FontAwesomeIcon icon={faCommentDollar} /></button>
                </span>
                {seeComments && 
                <>
                

                
                <MakeComment postId={props.postId}/>
                {commentAmmount.map((comment) => {
                getImage(comment.uid)
                getProfile(comment.uid);
                return <>
                

               
                    <div className="h-auto w-90 bg-slate-700 text-white text-base flex flex-col items-left mt-5 ml-10 col-span-2 rounded-lg">
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
                }
           
            </>
        )
        
    }

export default Comment;