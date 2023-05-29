import React from "react";  
import { useState, useEffect, useContext } from "react";

function Post(props) {

    return (
        <>
            <div className="h-auto w-2/3 bg-slate-500 text-white text-base flex flex-col items-center mt-20">
                <img src={props.img} alt="Image" />
                <h1>This is my uid: {props.uid}</h1>
                <h1>This is my content: {props.content}</h1>
                <h1>This is my creation time: {props.creationDate}</h1>
                <h1>This is my comments {props.comments}</h1>
                <h1>This is my likes: {props.likes}</h1>
            </div>
        </>
    )

}

export default Post;