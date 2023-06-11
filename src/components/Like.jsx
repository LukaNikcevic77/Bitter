import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { LogInContext } from "../contexts/LogInContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";

function Like(props) {

    const {updatePost} = useContext(HomeContext)
    const {loggedInUserId} = useContext(LogInContext);
    const [likeAmmount, setLikeAmmount] = useState(null);
    const [liked, setLiked] = useState(null);
    const [textColor, setTextColor] = useState("white");
           
    useEffect(() => {
        
        setLiked(false);
        setLikeAmmount(props.likes);
    }, [props.likes])
    
        return (
            <>
            <span className="likeButton">
                <h1 className="mediumText" style={{marginRight: '10%', marginLeft: '10%', marginTop: '7%'}}>{likeAmmount}</h1>
                <button className="btn-1 mediumText" 
                style={{padding: '5% 20%'}}
                 onClick={() => {
                    if (!liked && loggedInUserId != null) {
                        setLikeAmmount((prevLikeAmount) => {
                          const updatedLikeAmount = prevLikeAmount + 1;
                          updatePost(props.postId, "Likes", updatedLikeAmount);
                          setTextColor("rgb(255, 221, 67)");
                          return updatedLikeAmount;
                        });
                        setLiked(true);
                      } else if (liked && loggedInUserId != null) {
                        setLikeAmmount((prevLikeAmount) => {
                          const updatedLikeAmount = prevLikeAmount - 1;
                          updatePost(props.postId, "Likes", updatedLikeAmount);
                          setTextColor("white");
                          return updatedLikeAmount;
                        });
                        setLiked(false);
                      }
                    }}><FontAwesomeIcon icon={faFireFlameSimple}
                     style={{color: textColor}}
                    
                     /></button>
            </span>
            </>
        )
        
    }

export default Like;