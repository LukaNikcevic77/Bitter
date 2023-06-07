import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCommentDollar } from "@fortawesome/free-solid-svg-icons";
import MakeComment from "./MakeComment";
import OldComments from "./OldComments";
function Comment(props) {

    const {giveMeProfileInfo, getImage, url, removeQuotes} = useContext(HomeContext);
    
   
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
                

                
                <MakeComment postId={props.postId} />
                {commentAmmount.map((comment) => (
                        <OldComments comment={comment} />
                ))
                }
           </>}
            </>
        )
        
    }

export default Comment;