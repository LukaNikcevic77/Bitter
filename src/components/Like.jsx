import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFireFlameSimple } from "@fortawesome/free-solid-svg-icons";

function Like(props) {

    const {updatePost} = useContext(HomeContext)
    
    const [likeAmmount, setLikeAmmount] = useState(null);
    const [liked, setLiked] = useState(null);
    const [textColor, setTextColor] = useState("white");
           
    useEffect(() => {
        console.log(props.likes);
        setLiked(false);
        setLikeAmmount(props.likes);
    }, [props.likes])
    
        return (
            <>
            <span className="flex flex-row items-center ml-52">
                <h1 className="mr-2">{likeAmmount}</h1>
                <button className="text-2xl hover:text-4xl" 
                 onClick={() => {
                    if (!liked) {
                        setLikeAmmount((prevLikeAmount) => {
                          const updatedLikeAmount = prevLikeAmount + 1;
                          updatePost(props.postId, "Likes", updatedLikeAmount);
                          setTextColor("rgb(255, 221, 67)");
                          return updatedLikeAmount;
                        });
                        setLiked(true);
                      } else if (liked) {
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