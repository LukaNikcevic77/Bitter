import React from "react";  
import { useState, useEffect, useContext } from "react";
import { HomeContext } from "../contexts/HomeContext";

function Like(props) {

    const {updatePost} = useContext(HomeContext)
    
    const [likeAmmount, setLikeAmmount] = useState(null);
    const [liked, setLiked] = useState(null);

           
    useEffect(() => {
        console.log(props.likes);
        setLiked(false);
        setLikeAmmount(props.likes);
    }, [props.likes])
    
        return (
            <>
            <span>
                <h1>{likeAmmount}</h1>
                <button className="px-5 py-2 rounded-3xl bg-opacity-0  text-white hover:bg-white hover:text-black hover:border hover:border-5 hover:border-none"
                 onClick={() => {
                    if (!liked) {
                        setLikeAmmount((prevLikeAmount) => {
                          const updatedLikeAmount = prevLikeAmount + 1;
                          updatePost(props.postId, "Likes", updatedLikeAmount);
                          return updatedLikeAmount;
                        });
                        setLiked(true);
                      } else if (liked) {
                        setLikeAmmount((prevLikeAmount) => {
                          const updatedLikeAmount = prevLikeAmount - 1;
                          updatePost(props.postId, "Likes", updatedLikeAmount);
                          return updatedLikeAmount;
                        });
                        setLiked(false);
                      }
                    }}>Update Likes</button>
            </span>
            </>
        )
        
    }

export default Like;